/* Best SEO Expert In Bangladesh — landing page interactions */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  const header = $("#header");
  const progress = null;
  const toTop = $("#toTop");

  function onScroll() {
    const y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 20);
    if (toTop) toTop.classList.toggle("show", y > 450);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Reveal on scroll
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((el) => revealObserver.observe(el));

  // Safety net
  function revealInView() {
    $$(".reveal").forEach((el) => {
      if (el.classList.contains("visible")) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("visible");
    });
  }
  revealInView();
  window.addEventListener("scroll", revealInView, { passive: true });

  // Counters
  const counters = $$("[data-count]");
  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count, 10) || 0;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / 1600, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach((c) => counterObserver.observe(c));

  // Skill bars
  const bars = $$(".bar");
  const barObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const level = e.target.dataset.level || "0";
      const fill = $(".bar__fill", e.target);
      if (fill) setTimeout(() => (fill.style.width = level + "%"), 150);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.4 });
  bars.forEach((b) => barObserver.observe(b));

  // Contact form (demo handler)
  const form = $("#contactForm");
  if (form) {
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const btn = $("button[type='submit']", form);
      const original = btn.textContent;
      btn.textContent = "✓ Message Ready — DM me on social!";
      btn.disabled = true;
      setTimeout(() => { btn.textContent = original; btn.disabled = false; form.reset(); }, 3200);
    });
  }

  // Footer year
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
