/* ── Mobile nav toggle ─────────────────────────────────── */
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  /* Close nav on link click (mobile) */
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* Close nav on outside click */
  document.addEventListener('click', e => {
    if (!e.target.closest('.site-nav')) {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* ── Active nav link for current page ─────────────────────── */
const navItems = document.querySelectorAll('.nav-links a[data-page]');
const currentPage = document.body.dataset.page;
navItems.forEach(a => {
  a.classList.toggle('active', a.dataset.page === currentPage);
});

  /* ── Accordion smooth height animation ─────────────────── */
  document.querySelectorAll('details.accordion').forEach(details => {
    const summary = details.querySelector('summary');
    const body    = details.querySelector('.accordion-body');
    if (!summary || !body) return;

    summary.addEventListener('click', e => {
      e.preventDefault();
      if (details.open) {
        /* closing */
        body.style.overflow = 'hidden';
        const h = body.scrollHeight;
        body.style.height = h + 'px';
        requestAnimationFrame(() => {
          body.style.transition = 'height .28s ease, opacity .22s ease';
          body.style.height  = '0';
          body.style.opacity = '0';
        });
        body.addEventListener('transitionend', () => {
          details.open = false;
          body.style.height = body.style.transition = body.style.opacity = '';
        }, { once: true });
      } else {
        /* opening */
        details.open = true;
        const h = body.scrollHeight;
        body.style.overflow = 'hidden';
        body.style.height   = '0';
        body.style.opacity  = '0';
        requestAnimationFrame(() => {
          body.style.transition = 'height .28s ease, opacity .22s ease';
          body.style.height  = h + 'px';
          body.style.opacity = '1';
        });
        body.addEventListener('transitionend', () => {
          body.style.height = body.style.overflow = body.style.transition = body.style.opacity = '';
        }, { once: true });
      }
    });
  });


/* ── Open accordion when arriving via dropdown hash link ───── */
function openAccordionFromHash() {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (target && target.matches('details.accordion')) {
    target.open = true;
    setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
  }
}
window.addEventListener('hashchange', openAccordionFromHash);
openAccordionFromHash();
