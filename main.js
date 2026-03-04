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
