// ========================================================================
// Aman Kumar Jha — Portfolio interactivity
// ========================================================================

document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initTheme();
  initNav();
  initScrollProgress();
  initScrollSpy();
  initReveal();
  initTypedText();
  initSiteData();
  initCounters();
  initBackToTop();
  initContactForm();
  initFooterYear();
  initProjectLinks();
});

/* ---------- Preloader ---------- */
function initPreloader() {
  const pre = document.getElementById("preloader");
  window.addEventListener("load", () => {
    setTimeout(() => pre.classList.add("loaded"), 250);
  });
}

/* ---------- Theme toggle (persisted) ----------
   CSS handles the system light/dark preference natively via
   prefers-color-scheme, so no attribute is set on load unless the user
   has explicitly chosen a theme before — avoids a flash of the wrong
   theme while JS loads. */
function initTheme() {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const stored = safeGet("theme");

  if (stored) root.setAttribute("data-theme", stored);

  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isCurrentlyDark = current ? current === "dark" : systemDark;
    const next = isCurrentlyDark ? "light" : "dark";
    root.setAttribute("data-theme", next);
    safeSet("theme", next);
  });
}

/* ---------- Nav: scrolled state + mobile menu ---------- */
function initNav() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");

  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  links.querySelectorAll("[data-link]").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Scroll progress bar ---------- */
function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  const update = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const height = h.scrollHeight - h.clientHeight;
    bar.style.width = height > 0 ? `${(scrolled / height) * 100}%` : "0%";
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

/* ---------- Scroll spy for nav links ---------- */
function initScrollSpy() {
  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".nav-link[data-link]")];
  if (!sections.length) return;

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach((s) => spy.observe(s));
}

/* ---------- Reveal-on-scroll ---------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !items.length) {
    items.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => io.observe(el));
}

/* ---------- Typed hero subtitle ---------- */
function initTypedText() {
  const el = document.getElementById("typed");
  if (!el) return;

  const phrases = [
    "Full-Stack Developer",
    "RAG & AI Systems Engineer",
    "Competitive Programmer",
    "Electrical Engineering @ NIT Silchar",
  ];

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    el.textContent = phrases[0];
    return;
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const TYPE_SPEED = 60;
  const DELETE_SPEED = 32;
  const HOLD = 1400;

  function tick() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        return setTimeout(tick, HOLD);
      }
      return setTimeout(tick, TYPE_SPEED);
    }

    charIndex--;
    el.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      return setTimeout(tick, 300);
    }
    setTimeout(tick, DELETE_SPEED);
  }

  tick();
}

/* ---------- Animated stat counters ---------- */
function initCounters() {
  const counters = document.querySelectorAll(".stat-num");
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = (Number.isInteger(target) ? Math.round(value) : value.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((c) => io.observe(c));
}

/* ---------- Back-to-top button ---------- */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  window.addEventListener(
    "scroll",
    () => btn.classList.toggle("show", window.scrollY > 500),
    { passive: true }
  );
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ---------- Contact form (Netlify Forms — AJAX submit) ---------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "Sending...";
    status.className = "form-status";

    const data = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString(),
    })
      .then(() => {
        status.textContent = "Thanks! Your message has been sent — I'll get back to you soon.";
        status.className = "form-status ok";
        form.reset();
      })
      .catch(() => {
        status.textContent = "Something went wrong. Please email me directly instead.";
        status.className = "form-status err";
      });
  });
}

/* ---------- Footer year ---------- */
function initFooterYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- Site data loaded from config (see js/data.js) ----------
   Any element with data-field="path.to.value" gets its text replaced with
   SITE_DATA.path.to.value. Any element with data-count-field="path.to.value"
   (the animated stat tiles) gets its data-count attribute set instead —
   initCounters() picks that up afterwards. Update js/data.js and every
   place a number appears on the page updates with it. */
function initSiteData() {
  if (typeof SITE_DATA === "undefined") return;

  const resolve = (path) =>
    path.split(".").reduce((obj, key) => (obj == null ? undefined : obj[key]), SITE_DATA);

  document.querySelectorAll("[data-field]").forEach((el) => {
    const value = resolve(el.getAttribute("data-field"));
    if (value !== undefined && value !== null) el.textContent = value;
  });

  document.querySelectorAll("[data-count-field]").forEach((el) => {
    const value = resolve(el.getAttribute("data-count-field"));
    if (value !== undefined && value !== null) el.setAttribute("data-count", value);
  });
}

/* ---------- Project links loaded from config (see js/links.js) ---------- */
function initProjectLinks() {
  if (typeof PROJECT_LINKS === "undefined") return;

  Object.entries(PROJECT_LINKS).forEach(([slot, url]) => {
    const el = document.querySelector(`[data-link-slot="${slot}"]`);
    if (el && url) el.setAttribute("href", url);
  });

  const certLink = document.getElementById("cert-link");
  if (certLink && PROJECT_LINKS.certificate) {
    certLink.setAttribute("href", PROJECT_LINKS.certificate);
  }

  const documindLink = document.getElementById("documind-link");
  if (documindLink && PROJECT_LINKS.documind) {
    documindLink.setAttribute("href", PROJECT_LINKS.documind);
  }
}

/* ---------- localStorage helpers (safe for private browsing) ---------- */
function safeGet(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function safeSet(key, value) {
  try { localStorage.setItem(key, value); } catch { /* ignore */ }
}
