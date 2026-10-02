/* ONO — shared: menu + copy */
(function(){
  // copy buttons
  document.querySelectorAll('.copy').forEach(function(b){
    b.addEventListener('click',function(){
      var t=b.dataset.copy;
      var done=function(){b.textContent='Copied';setTimeout(function(){b.textContent='Copy';},1400);};
      try{navigator.clipboard.writeText(t).then(done,function(){sel(b);});}catch(e){sel(b);}
    });
  });
  function sel(b){var s=b.previousElementSibling;var r=document.createRange();r.selectNodeContents(s);var w=getSelection();w.removeAllRanges();w.addRange(r);}
})();
(function(){
  var nav=document.querySelector('.nav'), b=nav&&nav.querySelector('.burger'); if(!b) return;
  function set(o){nav.classList.toggle('open',o);b.setAttribute('aria-expanded',String(o));b.setAttribute('aria-label',o?'Close menu':'Open menu');}
  b.addEventListener('click',function(){set(!nav.classList.contains('open'))});
  nav.querySelectorAll('ul a').forEach(function(a){a.addEventListener('click',function(){set(false)})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
  document.addEventListener('click',function(e){if(!nav.contains(e.target))set(false)});
})();
