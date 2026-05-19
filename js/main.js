gsap.timeline({ onComplete: initPage })
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* Helper: split words into spans for staggered animation */
function splitWords(el){
  if(!el) return [];
  const text = el.innerHTML.trim();
  const words = text.split(/\s+/).filter(Boolean);
  el.innerHTML = words.map(w => `<span class="word"><span class="word-inner">${w}</span></span>`).join(' ');
  return el.querySelectorAll('.word-inner');
}

/* Cursor */
const dot  = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
const glow = document.getElementById('cursor-glow');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e=>{ mx=e.clientX; my=e.clientY;
  if(dot) gsap.to(dot,  {x:mx,y:my,duration:.06,ease:'none'});
  if(glow) gsap.to(glow, {x:mx,y:my,duration:.55,ease:'power2.out'});
});
(function lr(){ rx+=(mx-rx)*.1; ry+=(my-ry)*.1; if(ring) gsap.set(ring,{x:rx,y:ry}); requestAnimationFrame(lr); })();
document.addEventListener('mouseenter', e=>{
  const t = e.target;
  if(t && (t.tagName==='A' || t.tagName==='BUTTON')){
    gsap.to(glow, {width:520,height:520,duration:.45});
  }
}, true);
document.addEventListener('mouseleave', e=>{
  const t = e.target;
  if(t && (t.tagName==='A' || t.tagName==='BUTTON')){
    gsap.to(glow, {width:340,height:340,duration:.45});
  }
}, true);

/* HERO PARTICLES */
(function initParticles(){
  const cv  = document.getElementById('heroCanvas');
  if(!cv) return;
  const ctx = cv.getContext('2d');
  let W = cv.offsetWidth, H = cv.offsetHeight, pts=[];
  function rsz(){ W=cv.width=cv.offsetWidth; H=cv.height=cv.offsetHeight; }
  rsz(); window.addEventListener('resize', rsz);
  const COUNT = 60;
  for(let i=0;i<COUNT;i++) pts.push({x:Math.random()*W,y:Math.random()*H,dx:(Math.random()-.5)*.6,dy:(Math.random()-.5)*.6,r:Math.random()*1.5+.4});
  let mouseX=W/2, mouseY=H/2;
  document.addEventListener('mousemove', e=>{ mouseX=e.clientX; mouseY=e.clientY; });
  function draw(){ ctx.clearRect(0,0,W,H); pts.forEach(p=>{ ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle='rgba(255,255,255,0.06)'; ctx.fill(); p.x+=p.dx; p.y+=p.dy; if(p.x<0)p.x=W; if(p.x>W)p.x=0; if(p.y<0)p.y=H; if(p.y>H)p.y=0;}); requestAnimationFrame(draw); }
  draw();
})();

/* SNOW CANVAS */
document.querySelectorAll('.snow-canvas').forEach(cv=>{
  const ctx=cv.getContext('2d'), pts=[];
  function rsz(){ cv.width=cv.offsetWidth; cv.height=cv.offsetHeight; }
  rsz(); window.addEventListener('resize',rsz);
  for(let i=0;i<70;i++) pts.push({x:Math.random()*1920,y:Math.random()*1080,r:Math.random()*2+.4,dx:(Math.random()-.5)*.35,dy:Math.random()*.45+.15,o:Math.random()*.5+.2});
  (function draw(){ ctx.clearRect(0,0,cv.width,cv.height); pts.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(200,220,255,${p.o})`;ctx.fill();p.x+=p.dx;p.y+=p.dy;if(p.y>cv.height){p.y=-5;p.x=Math.random()*cv.width;}if(p.x<0||p.x>cv.width)p.x=Math.random()*cv.width;}); requestAnimationFrame(draw); })();
});

/* LOADER → PAGE */
gsap.timeline({ onComplete: initPage })
  .to('#loaderBar',   {width:'100%',duration:.9,ease:'power2.inOut'})
  .to('#loaderLabel', {opacity:1,duration:.35},'-=.65')
  .to('#loaderLogo',  {clipPath:'inset(0 0% 0 0)',duration:.95,ease:'power3.inOut'},'-=.4')
  .to(['#loaderLabel','#loaderBar'],{opacity:0,duration:.3},'+=.35')
  .to('#loaderWipe',  {scaleY:1,duration:.55,ease:'power3.inOut'})
  .to('#loaderLogo',  {y:-40,opacity:0,duration:.3,ease:'power2.in'},'-=.2')
  .to('#loader',      {yPercent:-100,duration:.8,ease:'power3.inOut'},'+=.05');

function initPage(){
  const loader = document.getElementById('loader'); if(loader) loader.style.display='none';
  gsap.to('#progress-bar',{width:'100%',ease:'none',scrollTrigger:{trigger:'body',start:'top top',end:'bottom bottom',scrub:true}});

  // NAV glass on scroll
  ScrollTrigger.create({start:80, onEnter:()=>document.getElementById('mainNav').classList.add('scrolled'), onLeaveBack:()=>document.getElementById('mainNav').classList.remove('scrolled')});

  // Hero parallax
  gsap.to('#hero-bg',   {yPercent:42,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});
  gsap.to('#hero-grid', {yPercent:22,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});
  gsap.to('#hero-content',{yPercent:12,opacity:1,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});

  // Entrance animations using splitWords
  const hw1 = splitWords(document.getElementById('heroLine1'));
  const hw2 = splitWords(document.getElementById('heroLine2'));
  gsap.from([hw1, hw2], {y:'100%', stagger:0.08, duration:0.9, ease:'expo.out'});

  // About animations
  gsap.to('#aboutLabel',{clipPath:'inset(0 0% 0 0)',duration:.8,ease:'power3.inOut',scrollTrigger:{trigger:'#about',start:'top 72%'}});
  const atw = splitWords(document.getElementById('aboutTitle'));
  gsap.to(atw,{y:'0%',duration:.8,stagger:.07,ease:'expo.out',scrollTrigger:{trigger:'#about',start:'top 68%'}});
  gsap.to(['#aboutText1','#aboutText2'],{opacity:1,y:0,duration:.7,stagger:.15,scrollTrigger:{trigger:'#about',start:'top 64%'}});

  // Wipe lines
  document.querySelectorAll('.wipe-inner').forEach(line=>{ gsap.to(line,{scaleX:1,duration:1.3,ease:'power3.inOut',scrollTrigger:{trigger:line,start:'top 92%'}}); });

  // Banner direction change on scroll velocity
  const track=document.getElementById('bannerTrack');
  ScrollTrigger.create({start:0,end:'max',onUpdate(self){ const v=self.getVelocity(); if(track) track.style.animationDirection = v<0 ? 'reverse' : 'normal'; }});

  // Project tilt / entrance
  document.querySelectorAll('.project-section').forEach((section,idx)=>{
    gsap.from(section.querySelectorAll('.project-content, .project-badge, .project-tagline, .project-desc'),{opacity:0,y:24,stagger:0.08,duration:0.8,ease:'power3.out',scrollTrigger:{trigger:section,start:'top 72%'}});
  });

  // Skill cards tilt
  document.querySelectorAll('.skill-card').forEach((card)=>{
    card.addEventListener('mousemove', (e)=>{
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5;
      const py = (e.clientY - r.top) / r.height - .5;
      gsap.to(card,{rotationY: px*6, rotationX: -py*6, duration:0.5, ease:'power2.out'});
    });
    card.addEventListener('mouseleave', ()=> gsap.to(card,{rotationY:0, rotationX:0, duration:0.6, ease:'elastic.out(1,.7)'}));
    gsap.to(card,{opacity:1,y:0,duration:.9,delay:.2,scrollTrigger:{trigger:card,start:'top 88%'}});
  });

  // Contact
  gsap.from('#contact .contact-inner',{opacity:0,y:20,duration:.9,scrollTrigger:{trigger:'#contact',start:'top 80%'}});
}
