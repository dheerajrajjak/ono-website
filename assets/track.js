/* ONO — analytics (PostHog). Events: $pageview/$pageleave (auto), cta_clicked, plan_selected,
   payment_toggled, format_viewed, hero_slide_viewed, faq_opened, section_viewed, scroll_depth,
   nav_clicked, internal_link_clicked, outbound_link_clicked, contact_copied, menu_opened */
(function(){
  var ph=function(){ return window.posthog; };
  function cap(ev,props,instant){ try{ var p=ph(); if(p&&p.capture) p.capture(ev,props||{},instant?{send_instantly:true,transport:'sendBeacon'}:undefined); }catch(e){} }

  // ---- page context (super properties on every event)
  var path=location.pathname.replace(/index\.html$/,'');
  var slug=path.replace(/^\/|\/$/g,'');
  var type='home', area=null, format=null, city=null;
  if(slug.indexOf('personal-trainer-')===0){ type='area'; area=slug.replace('personal-trainer-',''); }
  else if(/-at-home$|^couples-training$/.test(slug)){ type='format'; format=slug.replace(/-at-home$/,''); }
  else if(/^(terms|privacy)$/.test(slug)){ type='legal'; }
  else if(slug==='contact'){ type='contact'; }
  else if(slug){ type='other'; }
  var eb=document.querySelector('.sp-hero .eyebrow'); if(type==='area'&&eb) city=eb.textContent.trim();
  var ctx={page_type:type,page_slug:slug||'home',page_area:area,page_format:format,page_city:city};
  // keep UTM / click ids visible on every event of this session (PostHog also stores $initial_* & $entry_*)
  var q=new URLSearchParams(location.search), utm={};
  ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','fbclid','gbraid','wbraid'].forEach(function(k){ if(q.get(k)) utm[k]=q.get(k); });
  try{ var p=ph(); if(p){ p.register(ctx); if(Object.keys(utm).length) p.register_for_session(utm); } }catch(e){}

  // ---- where on the page an element sits
  function where(el){
    if(el.closest('header.nav')) return 'header';
    if(el.closest('footer')) return 'footer';
    if(el.closest('.plan')) return 'plan_card';
    if(el.closest('.hero')) return 'hero';
    if(el.closest('.sp-hero')) return 'page_hero';
    if(el.closest('.sp-cta')) return 'page_cta';
    if(el.closest('.ct-grid')) return 'contact_card';
    var s=el.closest('section[id],main[id],div[id]'); return s?s.id:'body';
  }
  function label(el){ return (el.getAttribute('aria-label')||el.textContent||'').replace(/\s+/g,' ').replace('→','').trim().slice(0,80); }
  function payMode(){ var b=document.querySelector('.pay-seg button[aria-pressed="true"]'); return b?(b.dataset.v==='w'?'weekly':'monthly'):null; }

  // ---- clicks
  document.addEventListener('click',function(e){
    var a=e.target.closest('a,button'); if(!a) return;
    var href=a.getAttribute('href')||'', loc=where(a), txt=label(a);
    if(/wa\.me|api\.whatsapp|tel:|mailto:/.test(href)){
      var plan=a.closest('.plan'), props={cta_location:loc,cta_text:txt,channel:/wa\.me|whatsapp/.test(href)?'whatsapp':(href.indexOf('tel:')===0?'phone':'email')};
      if(plan){ props.plan=plan.dataset.plan; props.payment=payMode(); cap('plan_selected',{plan:props.plan,payment:props.payment,cta_location:loc}); }
      var fx=document.getElementById('fxName'); if(loc==='training'&&fx) props.format_shown=fx.textContent;
      cap('cta_clicked',props,true); return;
    }
    if(a.matches('.pay-seg button')){ cap('payment_toggled',{payment:a.dataset.v==='w'?'weekly':'monthly'}); return; }
    if(a.matches('.fx-tabs button')){ cap('format_viewed',{format:label(a).replace(/^\d+\s*/,'').replace(/\s*(Core|Intervals|Endurance|Hybrid|Calm|Range|Duo)$/,''),trigger:'tab_click'}); return; }
    if(a.matches('.hero-tabs button')){ cap('hero_slide_viewed',{slide:txt,trigger:'tab_click'}); return; }
    if(a.matches('.burger')){ if(a.getAttribute('aria-expanded')!=='true') cap('menu_opened',{}); return; }
    if(a.matches('.copy')){ cap('contact_copied',{value_type:/@/.test(a.dataset.copy||'')?'email':'phone',cta_location:loc}); return; }
    if(!href) return;
    if(/^https?:\/\//.test(href) && href.indexOf(location.host)<0){ cap('outbound_link_clicked',{url:href,link_text:txt,cta_location:loc},true); return; }
    if(loc==='header'||loc==='footer'){ cap('nav_clicked',{target:href,link_text:txt,nav:loc}); return; }
    cap('internal_link_clicked',{target:href,link_text:txt,cta_location:loc});
  },true);

  // ---- FAQ opens
  document.querySelectorAll('details').forEach(function(d){ d.addEventListener('toggle',function(){ if(d.open){ var s=d.querySelector('summary'); cap('faq_opened',{question:s?s.textContent.trim():'',faq_location:where(d)}); } }); });

  // ---- sections seen (funnel steps)
  if('IntersectionObserver' in window){
    var seen={};
    var io=new IntersectionObserver(function(en){ en.forEach(function(x){ if(x.isIntersecting){ var id=x.target.id||x.target.dataset.trackSection; if(id&&!seen[id]){ seen[id]=1; cap('section_viewed',{section:id}); } io.unobserve(x.target); } }); },{threshold:.35});
    document.querySelectorAll('main section[id], #plans').forEach(function(s){ io.observe(s); });
  }

  // ---- scroll depth
  var marks=[25,50,75,100], hit={};
  function onScroll(){ var h=document.documentElement, max=h.scrollHeight-innerHeight; if(max<=0) return; var pct=Math.round(scrollY/max*100);
    marks.forEach(function(m){ if(pct>=m&&!hit[m]){ hit[m]=1; cap('scroll_depth',{percent:m}); } }); }
  addEventListener('scroll',function(){ if(onScroll.t) return; onScroll.t=setTimeout(function(){ onScroll.t=0; onScroll(); },300); },{passive:true});
})();
