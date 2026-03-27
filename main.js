const menuButton = document.querySelector('.menu-btn');
const nav = document.querySelector('[data-nav]');
const loader = document.querySelector('[data-loader]');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

function hideLoader() {
  if (!loader) {
    document.body.classList.remove('is-loading');
    return;
  }

  loader.classList.add('hidden');
  document.body.classList.remove('is-loading');
}

window.addEventListener('load', () => {
  window.setTimeout(hideLoader, 520);
});

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// Custom cursor (fine pointers only)
(() => {
  const finePointer = window.matchMedia('(pointer:fine)').matches;
  if (!finePointer) return;

  const ring = document.querySelector('[data-cursor-ring]');
  const dot = document.querySelector('[data-cursor-dot]');
  if (!ring || !dot) return;

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;
  let rafId = 0;

  const move = (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  };

  const loop = () => {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    rafId = window.requestAnimationFrame(loop);
  };

  const setInteractive = (active) => {
    ring.classList.toggle('active', active);
    dot.classList.toggle('active', active);
  };

  const hoverTargets = Array.from(
    document.querySelectorAll('a, button, input, textarea, .card, .project-story, .logo-rail')
  );
  const onEnter = () => setInteractive(true);
  const onLeave = () => setInteractive(false);
  hoverTargets.forEach((node) => {
    node.addEventListener('mouseenter', onEnter);
    node.addEventListener('mouseleave', onLeave);
  });

  window.addEventListener('mousemove', move, { passive: true });
  rafId = window.requestAnimationFrame(loop);

  window.addEventListener('beforeunload', () => {
    window.removeEventListener('mousemove', move);
    if (rafId) window.cancelAnimationFrame(rafId);
  });
})();
