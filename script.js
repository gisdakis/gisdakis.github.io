// Theme toggle + scroll-spy nav highlight + footer year.
// Vanilla JS, no dependencies, ~50 lines.
(() => {
  const root = document.documentElement;

  // ── theme toggle ────────────────────────────────────────────
  const KEY = 'theme';
  const apply = (t) => {
    if (t === 'light' || t === 'dark') root.setAttribute('data-theme', t);
    else root.removeAttribute('data-theme');
  };
  const next = (cur) => {
    const sysDark = matchMedia('(prefers-color-scheme: dark)').matches;
    if (cur === 'light') return 'dark';
    if (cur === 'dark')  return 'light';
    return sysDark ? 'light' : 'dark';
  };
  apply(localStorage.getItem(KEY));
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const cur = root.getAttribute('data-theme') || 'auto';
    const t = next(cur);
    localStorage.setItem(KEY, t);
    apply(t);
  });

  // ── scroll-spy nav highlight ───────────────────────────────
  const links = Array.from(document.querySelectorAll('[data-spy]'));
  const sections = links
    .map((a) => document.getElementById(a.dataset.spy))
    .filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.classList.toggle(
          'is-active', a.dataset.spy === e.target.id
        ));
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach((s) => io.observe(s));
  }

  // ── scroll reveals (sections + logo strip) ─────────────────
  const reveals = document.querySelectorAll('main > .section, main > .logos');
  reveals.forEach((el) => el.classList.add('reveal'));
  if ('IntersectionObserver' in window && reveals.length) {
    const ro = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          ro.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    reveals.forEach((el) => ro.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // ── footer year ─────────────────────────────────────────────
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
