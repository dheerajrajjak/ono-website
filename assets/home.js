/* ONO — homepage */
window.ONO_LINKS={"Strength": "/strength-training-at-home/", "HIIT": "/hiit-at-home/", "Cardio": "/cardio-at-home/", "Strength & Conditioning": "/strength-and-conditioning-at-home/", "Yoga": "/yoga-at-home/", "Mobility": "/mobility-training-at-home/", "Couples": "/couples-training/"};
window.ONO_FORMATS=[{"n": "Strength", "t": "Core", "l": "Progressive resistance training to build strength and muscle.", "f": ["Strength", "Muscle"], "c": "Trainer spotting a client through a kettlebell deadlift, both in frame", "i": "/assets/img/fmt-strength.webp", "a": "An ONO trainer cueing a client through a kettlebell deadlift in her living room"}, {"n": "HIIT", "t": "Intervals", "l": "Short bursts of hard work with recovery in between.", "f": ["Stamina", "Heart rate"], "c": "Client mid-interval with trainer timing and cueing beside them", "i": "/assets/img/fmt-hiit.webp", "a": "An ONO trainer with a stopwatch coaching a client through high knees at home"}, {"n": "Cardio", "t": "Endurance", "l": "Steady, low-impact work for your heart and lungs.", "f": ["Endurance", "Heart"], "c": "Client doing step-ups while trainer counts, living room", "i": "/assets/img/fmt-cardio.webp", "a": "An ONO trainer cueing a client through step-ups on a platform at home"}, {"n": "Strength & Conditioning", "t": "Hybrid", "l": "Strength work paired with intervals for fitness and stamina.", "f": ["Strength", "Stamina"], "c": "Trainer demonstrating a kettlebell swing, client following", "i": "/assets/img/fmt-snc.webp", "a": "An ONO trainer coaching a client through a kettlebell swing at home", "p": "50% 30%"}, {"n": "Yoga", "t": "Calm", "l": "Flexibility, balance and breath, at your pace.", "f": ["Flexibility", "Balance"], "c": "Trainer adjusting a client in a standing pose on the mat", "i": "/assets/img/fmt-yoga.webp", "a": "An ONO trainer adjusting a client in warrior II on a mat at home"}, {"n": "Mobility", "t": "Range", "l": "Hips, shoulders and spine that move well, so you lift well.", "f": ["Range", "Joints"], "c": "Trainer guiding a client through a deep lunge stretch", "i": "/assets/img/fmt-mobility.webp", "a": "An ONO trainer guiding a client through a lunge with a thoracic twist"}, {"n": "Couples", "t": "Duo", "l": "Two people, one trainer, one session. Any format.", "f": ["Train together", "Any format"], "c": "Two clients training side by side with one trainer", "i": "/assets/img/fmt-couples.webp", "a": "An ONO trainer coaching a couple at home: the husband in a dumbbell lunge, the wife in a squat"}];
(function(){
  // plans: monthly / weekly toggle
  var payBtns=[].slice.call(document.querySelectorAll('.pay-seg button')), note=document.getElementById('payNote');
  function setPay(v){
    payBtns.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.v===v))});
    document.querySelectorAll('.plan [data-pay]').forEach(function(el){el.hidden=el.dataset.pay!==v});
    document.querySelector('.plan[data-plan="weekend"]').hidden=(v==='w');
    document.querySelectorAll('.pl-btn').forEach(function(bt){var n=bt.dataset.name;
      bt.href='https://wa.me/919289558919?text='+encodeURIComponent("Hi ONO, I'd like the "+n+" plan, paid "+((v==='m'||n==='Weekend')?'monthly':'weekly')+".");});
    
  }
  payBtns.forEach(function(b){b.addEventListener('click',function(){setPay(b.dataset.v)})});
  setPay('m');

  // formats showcase
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var F=window.ONO_FORMATS||[], tabsEl=[].slice.call(document.querySelectorAll('.fx-tabs button')), fi=0, ft=null, auto=true;
  var fxPh=document.querySelector('.fx-ph'), fxInfo=document.querySelector('.fx-info'), bar=document.getElementById('fxBar');
  var layers=[document.getElementById('fxImg'),document.getElementById('fxImg2')], top=0, want=null;
  function srcs(u){return u.replace('.webp','-sm.webp')+' 800w, '+u+' 1536w'}
  function swapImg(f){
    var cur=layers[top]; if(cur.getAttribute('src')===f.i){cur.style.objectPosition=f.p||'';return;}
    var nx=layers[1-top]; want=f.i;
    nx.style.objectPosition=f.p||''; nx.sizes='(max-width:900px) 100vw, 820px'; nx.srcset=srcs(f.i); nx.src=f.i; nx.alt=f.a||'';
    var done=function(){ if(want!==f.i) return; nx.classList.add('on'); nx.removeAttribute('aria-hidden'); cur.classList.remove('on'); cur.setAttribute('aria-hidden','true'); top=1-top; };
    if(nx.decode){ nx.decode().then(done,done); } else if(nx.complete){ done(); } else { nx.onload=done; nx.onerror=done; }
  }
  var preloaded=false;
  function preloadAll(){ if(preloaded) return; preloaded=true; F.forEach(function(f){ if(!f.i) return; var im=new Image(); im.sizes='(max-width:900px) 100vw, 820px'; im.srcset=srcs(f.i); im.src=f.i; }); }
  if('IntersectionObserver' in window){ var pio=new IntersectionObserver(function(en){ if(en.some(function(x){return x.isIntersecting})){ preloadAll(); pio.disconnect(); } },{rootMargin:'800px 0px'}); pio.observe(document.querySelector('.fx')); } else preloadAll();
  function showF(i,user){
    fi=i; var f=F[i];
    tabsEl.forEach(function(t,k){t.setAttribute('aria-selected',String(k===i));t.tabIndex=k===i?0:-1});
    document.getElementById('fxName').textContent=f.n; document.getElementById('fxLine').textContent=f.l;
    document.getElementById('fxTag').textContent=f.t; document.getElementById('fxCap').textContent=f.c;
    document.getElementById('fxCount').textContent=('0'+(i+1)).slice(-2)+' / '+('0'+F.length).slice(-2);
    var stg=document.getElementById('fmt-panel');
    if(f.i){ swapImg(f); fxPh.classList.add('has-img');stg.classList.add('has-img'); }
    var mo=document.getElementById('fxMore'); if(mo){mo.href=(window.ONO_LINKS||{})[f.n]||'/#training'; mo.textContent='More about '+f.n+' →';}
    document.getElementById('fxFocus').innerHTML=f.f.map(function(x){return '<span>'+x+'</span>'}).join('');
    fxInfo.classList.remove('swap');fxPh.classList.add('swap');void fxInfo.offsetWidth;fxInfo.classList.add('swap');setTimeout(function(){fxPh.classList.remove('swap')},200);
    if(user){auto=false;} bar.classList.remove('run'); void bar.offsetWidth;
    clearTimeout(ft); if(auto&&!reduce){bar.classList.add('run'); ft=setTimeout(function(){showF((fi+1)%F.length)},5500);}
  }
  tabsEl.forEach(function(t,k){t.addEventListener('click',function(){showF(k,true)});
    t.addEventListener('keydown',function(e){var d=e.key==='ArrowDown'||e.key==='ArrowRight'?1:e.key==='ArrowUp'||e.key==='ArrowLeft'?-1:0;if(d){e.preventDefault();var n=(fi+d+F.length)%F.length;showF(n,true);tabsEl[n].focus();}})});
  if('IntersectionObserver' in window){var fxo=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting&&auto){showF(fi)}else{clearTimeout(ft);bar.classList.remove('run')}})},{threshold:.4});fxo.observe(document.querySelector('.fx'));}

})();
(function(){
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  // scroll reveal
  var sel='section .head, .fact, .bench, .step, .session-grid>*, .climb, .pcell, .tr, .ba-card, .q, .fx-stage, .pcard, .incl, .city, .group, .final .wrap>*';
  var els=[].slice.call(document.querySelectorAll(sel));
  if('IntersectionObserver' in window && !reduce){
    document.documentElement.classList.add('js');
    var vh=innerHeight;
    els.forEach(function(e){ if(e.getBoundingClientRect().top>vh*0.9) e.classList.add('rv'); });
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){
      var sib=x.target.parentElement?[].indexOf.call(x.target.parentElement.children,x.target):0;
      x.target.style.transitionDelay=Math.min(sib,5)*70+'ms';
      x.target.classList.add('in');io.unobserve(x.target);}})},{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(e){if(e.classList.contains('rv'))io.observe(e);});
    setTimeout(function(){els.forEach(function(e){e.classList.add('in')})},6000);
  }

  // count-up for the science figures
  function countUp(el){
    var txt=el.textContent, parts=txt.split(/(\d+)/), t0=null, dur=1100;
    function f(ts){ if(!t0)t0=ts; var k=Math.min(1,(ts-t0)/dur), e=1-Math.pow(1-k,3);
      el.textContent=parts.map(function(p){return /^\d+$/.test(p)?Math.round(+p*e):p}).join('');
      if(k<1)requestAnimationFrame(f); else el.textContent=txt; }
    requestAnimationFrame(f);
  }
  var figs=document.querySelectorAll('.fact .fig:not(.word)');
  if('IntersectionObserver' in window && !reduce){
    var fo=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){
      var n=x.target.firstChild; if(n&&n.nodeType===3){var span=document.createElement('span');span.textContent=n.textContent;x.target.replaceChild(span,n);countUp(span);}
      fo.unobserve(x.target);}})},{threshold:.6});
    figs.forEach(function(f){fo.observe(f)});
  }

  // progression climb
  var stairs=document.getElementById('stairs'), runner=document.getElementById('runner');
  var bars=[].slice.call(stairs.querySelectorAll('.st')), idx=0, timer=null;
  function place(i){ var b=bars[i]; runner.style.transform='translate('+(b.offsetLeft+b.offsetWidth/2)+'px,'+(-(b.offsetHeight+6))+'px)';
    bars.forEach(function(x,k){x.classList.toggle('done',k<=i)}); }
  function step(){ idx=(idx+1)%bars.length; place(idx); timer=setTimeout(step, idx===bars.length-1?1800:(bars[idx].classList.contains('rt')?1100:600)); }
  place(0);
  addEventListener('resize',function(){place(idx)});
  if(!reduce){
    var so=new IntersectionObserver(function(en){en.forEach(function(x){
      if(x.isIntersecting){ if(!timer){stairs.classList.add('intro'); timer=setTimeout(step,900);} }
      else { clearTimeout(timer); timer=null; }
    })},{threshold:.3});
    so.observe(stairs);
  } else { place(bars.length-1); }

  // mantra cycle
  var m=[].slice.call(document.querySelectorAll('#mantra span')), mi=0;
  if(!reduce) setInterval(function(){ m[mi].classList.remove('on'); mi=(mi+1)%m.length; m[mi].classList.add('on'); },1500);
})();
(function(){
  var S=[
    {n:'Goblet squat',s:'Strength · main lift · set 3 of 4',k1:'Load',v1:'8<small> kg</small>',d1:'+4 kg since baseline',k2:'Reps',v2:'10',d2:'Form: logged',b:[50,50,50,75,75,75,100,100],c1:'Wk 1 · 4 kg',c2:'Wk 8 · 8 kg'},
    {n:'Shoulder press',s:'Couples · one trainer, two plans',k1:'Your load',v1:'5<small> kg</small>',d1:'+2 kg since baseline',k2:'Partner',v2:'4<small> kg</small>',d2:'Bicep curls · 12 reps',b:[60,60,60,80,80,80,100,100],c1:'Wk 1 · 3 kg',c2:'Wk 8 · 5 kg'},
    {n:'Seated side bend',s:'Yoga &amp; Mobility · cool-down',k1:'Hold',v1:'30<small> s</small>',d1:'+15 s since baseline',k2:'Reach',v2:'Toes',d2:'Was mid-shin',b:[50,50,58,66,75,83,91,100],c1:'Wk 1 · 15 s',c2:'Wk 8 · 30 s'}
  ];
  var root=document.getElementById('heroCar'); if(!root) return;
  var imgs=[].slice.call(root.querySelectorAll('.slide')), tabs=[].slice.call(root.querySelectorAll('.hero-tabs button')), tabRow=root.querySelector('.hero-tabs');
  var card=root.querySelector('.logcard'), bars=[].slice.call(document.querySelectorAll('#lcBars i'));
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cur=0, t=null, DUR=5500, paused=false;
  function $(id){return document.getElementById(id)}
  function go(i){
    cur=(i+S.length)%S.length; var d=S[cur];
    imgs.forEach(function(im,k){im.classList.toggle('on',k===cur)});
    var eb=document.getElementById('heroEyebrow'); if(eb) eb.textContent=cur===1?'Couple training at home':'Personal training at home';
    tabs.forEach(function(b,k){b.setAttribute('aria-selected',String(k===cur));b.tabIndex=k===cur?0:-1});
    card.classList.add('swap');
    setTimeout(function(){
      $('lcName').innerHTML=d.n;$('lcSub').innerHTML=d.s;$('lcK1').textContent=d.k1;$('lcV1').innerHTML=d.v1;$('lcD1').textContent=d.d1;
      $('lcK2').textContent=d.k2;$('lcV2').innerHTML=d.v2;$('lcD2').textContent=d.d2;$('lcC1').textContent=d.c1;$('lcC2').textContent=d.c2;
      bars.forEach(function(b,k){b.style.height=d.b[k]+'%'});
      card.classList.remove('swap');
    },reduce?0:280);
    schedule();
  }
  function schedule(){
    clearTimeout(t); tabRow.classList.remove('run');
    if(reduce||paused) return;
    void tabRow.offsetWidth; tabRow.style.setProperty('--dur',DUR+'ms'); tabRow.classList.add('run');
    t=setTimeout(function(){go(cur+1)},DUR);
  }
  tabs.forEach(function(b,k){
    b.addEventListener('click',function(){go(k)});
    b.addEventListener('keydown',function(e){var dd=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(dd){e.preventDefault();go(cur+dd);tabs[cur].focus();}});
  });
  root.addEventListener('mouseenter',function(){paused=true;clearTimeout(t);tabRow.classList.remove('run')});
  root.addEventListener('mouseleave',function(){paused=false;schedule()});
  document.addEventListener('visibilitychange',function(){ if(document.hidden){clearTimeout(t)} else schedule(); });
  schedule();
})();
