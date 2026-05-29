// Script for cinematic transitions and interactive hotspots
const landing = document.getElementById('landing');
const map = document.getElementById('map-screen');
const infoScreens = document.getElementById('info-screens');

// helper
const show = el=>{el.classList.remove('hidden');setTimeout(()=>el.classList.add('show'),30)}
const hide = el=>{el.classList.remove('show');setTimeout(()=>el.classList.add('hidden'),400)}

// Landing click => transition to map
landing.addEventListener('click', ()=>{
  landing.classList.add('transition-out');
  setTimeout(()=>{
    landing.style.display='none';
    map.classList.remove('hidden');
    map.classList.add('show');
  },900);
});

// Hotspot clicks open info screen
const hotspots = document.querySelectorAll('.hotspot');
hotspots.forEach(h=>{
  h.addEventListener('click', e=>{
    const place = h.dataset.place;
    const target = document.getElementById('info-'+place.replace(/ /g,'-'));
    if(target){
      // hide map gracefully
      map.classList.remove('show');
      setTimeout(()=>{map.classList.add('hidden')},500);
      // show info
      target.classList.remove('hidden');
      setTimeout(()=>target.classList.add('show'),60);
    }
  });
});

// Back buttons
document.querySelectorAll('[data-back]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    // find parent info-screen
    const info = btn.closest('.info-screen');
    if(info){
      info.classList.remove('show');
      setTimeout(()=>info.classList.add('hidden'),420);
      // show map again
      setTimeout(()=>{map.classList.remove('hidden');setTimeout(()=>map.classList.add('show'),40)},420);
    }
  });
});

// Close info with ESC
document.addEventListener('keydown', e=>{
  if(e.key==='Escape'){
    const open = document.querySelector('.info-screen.show');
    if(open){
      open.classList.remove('show');
      setTimeout(()=>open.classList.add('hidden'),420);
      setTimeout(()=>{map.classList.remove('hidden');setTimeout(()=>map.classList.add('show'),40)},420);
    }
  }
});

// Improve touch: enlarge hotspots on touchstart
hotspots.forEach(h=>{
  h.addEventListener('touchstart', ()=>h.classList.add('touched'))
  h.addEventListener('touchend', ()=>h.classList.remove('touched'))
});

// Preload some images to make transitions smoother
const imgs = Array.from(document.querySelectorAll('.info-gallery img, .map-screen .bg, .landing .bg')).map(i=>i.src||i.style.backgroundImage);
imgs.forEach(src=>{if(!src) return; const url = src.replace(/^url\(['"]?|['"]?\)$/g,''); const img=new Image(); img.src=url});
