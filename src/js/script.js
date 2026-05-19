/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * PORTFOLIO MAIN SCRIPT
 * ═══════════════════════════════════════════════════════════════════════════════
 */

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ═══════════════════════════════════════════════════════════════════════════════
   HELPER — Split words into span pairs for animation
   ═══════════════════════════════════════════════════════════════════════════════ */

function splitWords(el) {
  const parts = el.innerHTML.split(/<br\s*\/>/i);
  el.innerHTML = parts
    .map((p) =>
      p
        .split(' ')
        .map((word) => `<span class="word"><span class="word-inner">${word}</span></span>`)
        .join('&nbsp;')
    )
    .join('<br>');
  return el.querySelectorAll('.word-inner');
}

/* ═══════════════════════════════════════════════════════════════════════════════
   CURSOR CUSTOM
   ═══════════════════════════════════════════════════════════════════════════════ */

const dot = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
const glow = document.getElementById('cursor-glow');

let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
  gsap.to(dot, { x: mx, y: my, duration: 0.06, ease: 'none' });
  gsap.to(glow, { x: mx, y: my, duration: 0.55, ease: 'power2.out' });
});

(function lr() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  gsap.set(ring, { x: rx, y: ry });
  requestAnimationFrame(lr);
})();

document.querySelectorAll('a, button').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    gsap.to(dot, { scale: 0.5, duration: 0.3 });
    gsap.to(ring, { scale: 1.5, duration: 0.3 });
    gsap.to(glow, { width: 520, height: 520, duration: 0.45 });
  });

  el.addEventListener('mouseleave', () => {
    gsap.to(dot, { scale: 1, duration: 0.3 });
    gsap.to(ring, { scale: 1, duration: 0.3 });
    gsap.to(glow, { width: 340, height: 340, duration: 0.45 });
  });
});

/* ═══════════════════════════════════════════════════════════════════════════════
   HERO 3D PARTICLE FIELD
   ═══════════════════════════════════════════════════════════════════════════════ */

(function initParticles() {
  const cv = document.getElementById('heroCanvas');
  const ctx = cv.getContext('2d');
  let W, H, pts = [];

  function rsz() {
    W = cv.width = cv.offsetWidth;
    H = cv.height = cv.offsetHeight;
  }

  rsz();
  window.addEventListener('resize', rsz);

  const COUNT = 80;
  for (let i = 0; i < COUNT; i++)
    pts.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.5 + 0.4,
      z: Math.random(),
    });

  let mouseX = W / 2,
    mouseY = H / 2;
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function draw() {
    ctx.fillStyle = 'rgba(5,5,8,0.1)';
    ctx.fillRect(0, 0, W, H);

    pts.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 150) {
        p.vx += (dx / dist) * 0.5;
        p.vy += (dy / dist) * 0.5;
      }

      ctx.fillStyle = `rgba(255,123,46,${0.6 * (1 - dist / 300)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      pts.forEach((p2, j) => {
        if (i < j) {
          const dx2 = p2.x - p.x;
          const dy2 = p2.y - p.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < 100) {
            ctx.strokeStyle = `rgba(255,123,46,${0.2 * (1 - dist2 / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
    });

    requestAnimationFrame(draw);
  }

  draw();
})();

/* ═══════════════════════════════════════════════════════════════════════════════
   SNOW CANVAS (for projects)
   ═══════════════════════════════════════════════════════════════════════════════ */

document.querySelectorAll('.snow-canvas').forEach((cv) => {
  const ctx = cv.getContext('2d');
  const pts = [];

  function rsz() {
    cv.width = cv.offsetWidth;
    cv.height = cv.offsetHeight;
  }

  rsz();
  window.addEventListener('resize', rsz);

  for (let i = 0; i < 70; i++)
    pts.push({
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      r: Math.random() * 2 + 0.4,
      dx: (Math.random() - 0.5) * 0.35,
      dy: Math.random() * 0.45 + 0.15,
      o: Math.random() * 0.5 + 0.2,
    });

  (function draw() {
    ctx.clearRect(0, 0, cv.width, cv.height);

    pts.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,220,255,${p.o})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.y > cv.height) {
        p.y = -5;
        p.x = Math.random() * cv.width;
      }

      if (p.x < 0 || p.x > cv.width) p.x = Math.random() * cv.width;
    });

    requestAnimationFrame(draw);
  })();
});

/* ═══════════════════════════════════════════════════════════════════════════════
   LOADER → PAGE TRANSITION
   ═══════════════════════════════════════════════════════════════════════════════ */

gsap.timeline({ onComplete: initPage })
  .to('#loaderBar', { width: '100%', duration: 0.9, ease: 'power2.inOut' })
  .to('#loaderLabel', { opacity: 1, duration: 0.35 }, '-=0.65')
  .to('#loaderLogo', { clipPath: 'inset(0 0% 0 0)', duration: 0.95, ease: 'power3.inOut' }, '-=0.4')
  .to(['#loaderLabel', '#loaderBar'], { opacity: 0, duration: 0.3 }, '+=0.35')
  .to('#loaderWipe', { scaleY: 1, duration: 0.55, ease: 'power3.inOut' })
  .to('#loaderLogo', { y: -40, opacity: 0, duration: 0.3, ease: 'power2.in' }, '-=0.2')
  .to('#loader', { yPercent: -100, duration: 0.8, ease: 'power3.inOut' }, '+=0.05');

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE INITIALIZATION
   ═══════════════════════════════════════════════════════════════════════════════ */

function initPage() {
  document.getElementById('loader').style.display = 'none';

  /* PROGRESS BAR */
  gsap.to('#progress-bar', {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    },
  });

  /* NAV GLASS EFFECT */
  ScrollTrigger.create({
    start: 80,
    onEnter: () => document.getElementById('mainNav').classList.add('scrolled'),
    onLeaveBack: () => document.getElementById('mainNav').classList.remove('scrolled'),
  });

  /* HERO 3D PARALLAX LAYERS */
  const layers = [
    { el: document.getElementById('hero-bg'), speed: 0.5 },
    { el: document.getElementById('hero-grid'), speed: 0.3 },
    { el: document.getElementById('hero-content'), speed: 0.2 },
  ];

  const heroEl = document.getElementById('hero');
  heroEl.addEventListener('mousemove', (e) => {
    const rect = heroEl.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    layers.forEach(({ el, speed }) => {
      gsap.to(el, { x: x * speed * 0.1, y: y * speed * 0.1, duration: 0.8, ease: 'power2.out' });
    });
  });

  heroEl.addEventListener('mouseleave', () => {
    layers.forEach(({ el }) => gsap.to(el, { x: 0, y: 0, duration: 1.5, ease: 'elastic.out(1,.5)' }));
  });

  /* HERO SCROLL PARALLAX */
  gsap.to('#hero-bg', {
    yPercent: 42,
    ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
  });

  gsap.to('#hero-grid', {
    yPercent: 22,
    ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
  });

  gsap.to('#hero-content', {
    yPercent: 28,
    opacity: 0,
    ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: '68% top', scrub: true },
  });

  /* HERO ENTRANCE ANIMATION */
  if (document.getElementById('heroLine1') && document.getElementById('heroLine2')) {
    const hw1 = splitWords(document.getElementById('heroLine1'));
    const hw2 = splitWords(document.getElementById('heroLine2'));

    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .to('#heroEyebrow', { opacity: 1, y: 0, duration: 0.65 }, 0)
      .to(hw1, { y: '0%', duration: 0.8, stagger: 0.07 }, 0)
      .to(hw2, { y: '0%', duration: 0.8, stagger: 0.07 }, 0.1)
      .to('#heroSub', { opacity: 1, y: 0, duration: 0.65 }, 0.3)
      .to('#heroScroll', { opacity: 1, y: 0, duration: 0.5 }, 0.5);
  }

  /* ABOUT SECTION */
  gsap.from('#about', {
    rotateX: 15,
    opacity: 0,
    y: 100,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: { trigger: '#about', start: 'top 88%', toggleActions: 'play none none none' },
  });

  if (document.getElementById('aboutLabel')) {
    gsap.to('#aboutLabel', {
      clipPath: 'inset(0 0% 0 0)',
      duration: 0.8,
      ease: 'power3.inOut',
      scrollTrigger: { trigger: '#about', start: 'top 72%', toggleActions: 'play none none none' },
    });
  }

  if (document.getElementById('aboutTitle')) {
    const atw = splitWords(document.getElementById('aboutTitle'));
    gsap.to(atw, {
      y: '0%',
      duration: 0.8,
      stagger: 0.07,
      ease: 'expo.out',
      scrollTrigger: { trigger: '#about', start: 'top 68%', toggleActions: 'play none none none' },
    });
  }

  ['#aboutText1', '#aboutText2'].forEach((sel, i) => {
    const el = document.querySelector(sel);
    if (el) {
      const words = splitWords(el);
      gsap.to(words, {
        y: '0%',
        stagger: 0.035,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#about',
          start: `top ${64 - i * 6}%`,
          end: `top ${28 - i * 4}%`,
          scrub: 0.5,
        },
      });
    }
  });

  /* STATS COUNTER */
  ScrollTrigger.create({
    trigger: '.stats-row',
    start: 'top 82%',
    onEnter: () => {
      document.querySelectorAll('.stat-num').forEach((el) => {
        const finalNum = parseInt(el.textContent);
        gsap.to(el, {
          textContent: finalNum,
          duration: 2,
          snap: { textContent: 1 },
          ease: 'power2.out',
        });
      });
    },
    once: true,
  });

  if (document.getElementById('aboutQuote')) {
    gsap.to('#aboutQuote', {
      opacity: 1,
      x: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '#aboutQuote', start: 'top 76%', toggleActions: 'play none none none' },
    });
  }

  /* WIPE LINES */
  document.querySelectorAll('.wipe-inner').forEach((line) => {
    gsap.to(line, {
      scaleX: 1,
      duration: 1.3,
      ease: 'power3.inOut',
      scrollTrigger: { trigger: line, start: 'top 92%', toggleActions: 'play none none none' },
    });
  });

  /* BANNER */
  const track = document.getElementById('bannerTrack');
  if (track) {
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate(self) {
        const v = self.getVelocity();
        track.style.animationPlayState = Math.abs(v) > 10 ? 'running' : 'paused';
        track.style.animationDirection = v < 0 ? 'reverse' : 'normal';
      },
    });
  }

  /* PROJECT SECTIONS */
  document.querySelectorAll('.project-section').forEach((section, idx) => {
    gsap.from(section, {
      rotateX: 10,
      opacity: 0,
      y: 100,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    const badge = section.querySelector('.project-badge');
    if (badge) {
      gsap.to(badge, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
      });
    }

    const techs = section.querySelectorAll('.tech-tag');
    if (techs.length) {
      gsap.to(techs, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
      });
    }

    const content = section.querySelector('.project-content');
    if (content) {
      const shine = content.querySelector('.card-shine');
      content.addEventListener('mousemove', (e) => {
        const rect = content.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        if (shine) {
          gsap.to(shine, {
            opacity: 1,
            backgroundPosition: `${x}% ${y}%`,
            duration: 0.3,
            overwrite: 'auto',
          });
        }
      });

      content.addEventListener('mouseleave', () => {
        if (shine) gsap.to(shine, { opacity: 0, duration: 0.3 });
      });
    }

    const texts = section.querySelectorAll('.project-tagline, .project-desc, .project-quote, .project-link');
    gsap.to(texts, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' },
    });
  });

  /* SKILLS CARDS */
  document.querySelectorAll('.skill-card').forEach((card, i) => {
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#skills',
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
      delay: i * 0.05,
    });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;

      gsap.to(card, {
        rotateX: y,
        rotateY: x,
        duration: 0.3,
        overwrite: 'auto',
      });

      const shine = card.querySelector('.card-shine');
      if (shine) {
        gsap.to(shine, {
          opacity: 1,
          backgroundPosition: `${50 + x * 5}% ${50 + y * 5}%`,
          duration: 0.3,
          overwrite: 'auto',
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      const shine = card.querySelector('.card-shine');
      if (shine) gsap.to(shine, { opacity: 0, duration: 0.3 });
    });

    const skillBars = card.querySelectorAll('.skill-bar-fill');
    if (skillBars.length) {
      gsap.to(skillBars, {
        width: (el) => el.dataset.value || '80%',
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }
  });

  /* SKILLS HEADER */
  if (document.getElementById('skillsEyebrow')) {
    gsap.to('#skillsEyebrow', {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power2.out',
      scrollTrigger: { trigger: '#skills', start: 'top 72%', toggleActions: 'play none none none' },
    });
  }

  if (document.getElementById('skillsTitle')) {
    const stw = splitWords(document.getElementById('skillsTitle'));
    gsap.to(stw, {
      y: '0%',
      duration: 0.9,
      stagger: 0.11,
      ease: 'expo.out',
      scrollTrigger: { trigger: '#skills', start: 'top 68%', toggleActions: 'play none none none' },
    });
  }

  if (document.getElementById('skillsSub')) {
    gsap.to('#skillsSub', {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power2.out',
      scrollTrigger: { trigger: '#skills', start: 'top 64%', toggleActions: 'play none none none' },
    });
  }

  /* CONTACT SECTION */
  gsap.from('#contact .contact-inner', {
    rotateX: 15,
    opacity: 0,
    y: 100,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: { trigger: '#contact', start: 'top 80%', toggleActions: 'play none none none' },
  });

  if (document.getElementById('contactLabel')) {
    gsap.to('#contactLabel', {
      opacity: 1,
      y: 0,
      duration: 0.65,
      scrollTrigger: { trigger: '#contact', start: 'top 72%', toggleActions: 'play none none none' },
    });
  }

  if (document.getElementById('contactTitle')) {
    const ctw = splitWords(document.getElementById('contactTitle'));
    gsap.to(ctw, {
      y: '0%',
      duration: 0.9,
      stagger: 0.09,
      ease: 'expo.out',
      scrollTrigger: { trigger: '#contact', start: 'top 68%', toggleActions: 'play none none none' },
    });
  }

  if (document.getElementById('contactQuote')) {
    gsap.to('#contactQuote', {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power2.out',
      scrollTrigger: { trigger: '#contact', start: 'top 68%', toggleActions: 'play none none none' },
    });
  }

  /* CONTACT METHODS CARDS */
  document.querySelectorAll('.contact-method').forEach((method, i) => {
    gsap.to(method, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: '#contact', start: 'top 65%', toggleActions: 'play none none none' },
      delay: i * 0.12,
    });
  });

  /* CONTACT CTA BUTTON */
  if (document.querySelector('.contact-cta')) {
    gsap.to('.contact-cta', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: '#contact', start: 'top 60%', toggleActions: 'play none none none' },
    });
  }

  /* FOOTER */
  gsap.to('footer', {
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: { trigger: 'footer', start: 'top 95%', toggleActions: 'play none none none' },
  });

  /* NAV ANIMATIONS */
  gsap.to('.nav-logo', {
    opacity: 1,
    duration: 0.8,
    delay: 1.5,
    ease: 'power2.out',
  });

  gsap.to('.nav-links li', {
    opacity: 1,
    duration: 0.6,
    stagger: 0.1,
    delay: 1.6,
    ease: 'power2.out',
  });
}
