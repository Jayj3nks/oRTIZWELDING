/* IRONBOUND WELDING — motion & sparks */

/* ══ TODO: set the email that should receive quote requests.
   First submission triggers a one-time activation email from FormSubmit — click it once. ══ */
const QUOTE_FORM_EMAIL = "hello@yourwelding.com";

(() => {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ── Lenis smooth scroll ── */
  let lenis = null;
  if (!reduced && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    if (window.ScrollTrigger) lenis.on("scroll", ScrollTrigger.update);
  }

  /* ── Anchor scrolling ── */
  document.querySelectorAll("[data-scroll]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const id = el.getAttribute("href");
      if (!id || !id.startsWith("#")) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -60 });
      else target.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ── Nav state + scroll progress ── */
  const nav = document.getElementById("nav");
  const bar = document.getElementById("progressBar");
  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Hero intro: masked line-by-line reveal ── */
  if (window.gsap && !reduced) {
    gsap.registerPlugin(ScrollTrigger);
    const heroMasks = document.querySelectorAll(".hero__title .mask__in");
    gsap.set(heroMasks, { yPercent: 115 });
    gsap.set("[data-intro]", { y: 26, opacity: 0 });

    gsap.timeline({ defaults: { ease: "power4.out" } })
      .to(heroMasks, { yPercent: 0, duration: 1.25, stagger: 0.14 }, 0.25)
      .to("[data-intro]", { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 }, 0.7);

    /* contact title reveal on scroll */
    const contactMasks = document.querySelectorAll(".contact__title .mask__in");
    gsap.set(contactMasks, { yPercent: 115 });
    gsap.to(contactMasks, {
      yPercent: 0, duration: 1.2, ease: "power4.out", stagger: 0.12,
      scrollTrigger: { trigger: ".contact__title", start: "top 82%" },
    });

    /* generic section reveals */
    gsap.utils.toArray("[data-reveal]").forEach((el) => {
      gsap.fromTo(el,
        { y: 44, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
    });

    /* hero parallax drift on scroll */
    gsap.to("#heroInner", {
      y: 110, opacity: 0.35, ease: "none",
      scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
    });
  }

  /* ── Hero 3D tilt on pointer ── */
  const hero = document.getElementById("hero");
  const heroInner = document.getElementById("heroInner");
  if (!reduced && window.gsap && window.matchMedia("(pointer: fine)").matches) {
    const rx = gsap.quickTo(heroInner, "rotationY", { duration: 0.8, ease: "power3.out" });
    const ry = gsap.quickTo(heroInner, "rotationX", { duration: 0.8, ease: "power3.out" });
    gsap.set(heroInner, { transformPerspective: 1200 });
    hero.addEventListener("pointermove", (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      rx(nx * 3.5);
      ry(ny * -2.5);
    });
    hero.addEventListener("pointerleave", () => { rx(0); ry(0); });
  }

  /* ── Spark particles ── */
  const canvas = document.getElementById("sparks");
  if (canvas && !reduced) {
    const ctx = canvas.getContext("2d");
    let w, h, dpr, particles = [], mouseX = 0.5;
    const COUNT = window.innerWidth < 760 ? 34 : 70;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", (e) => { mouseX = e.clientX / window.innerWidth; }, { passive: true });

    const spawn = () => ({
      x: Math.random() * w,
      y: h + Math.random() * 40,
      r: Math.random() * 1.8 + 0.4,
      vy: -(Math.random() * 1.1 + 0.35),
      vx: (Math.random() - 0.5) * 0.5,
      life: 1,
      decay: Math.random() * 0.004 + 0.002,
      hue: Math.random() < 0.75 ? 20 : 38,
    });
    for (let i = 0; i < COUNT; i++) { const p = spawn(); p.y = Math.random() * h; particles.push(p); }

    let running = true;
    const io = new IntersectionObserver(([entry]) => { running = entry.isIntersecting; });
    io.observe(canvas);

    const tick = () => {
      requestAnimationFrame(tick);
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      const drift = (mouseX - 0.5) * 0.6;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx + drift;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0 || p.y < -10) { particles[i] = spawn(); continue; }
        ctx.globalAlpha = Math.max(p.life, 0) * 0.9;
        ctx.fillStyle = `hsl(${p.hue} 100% ${55 + p.life * 15}%)`;
        ctx.shadowColor = "rgba(255, 92, 26, 0.9)";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };
    tick();
  }

  /* ── Quote form → FormSubmit (free, emails details + photo attachment) ── */
  const form = document.getElementById("quoteForm");
  if (form) {
    const fileInput = document.getElementById("qPhoto");
    const drop = document.getElementById("fileDrop");
    const dropText = document.getElementById("fileDropText");
    const submitBtn = document.getElementById("quoteSubmit");
    const status = document.getElementById("quoteStatus");
    const MAX_BYTES = 5 * 1024 * 1024;

    fileInput.addEventListener("change", () => {
      const f = fileInput.files[0];
      if (f && !f.type.startsWith("image/")) { fileInput.value = ""; return; }
      if (f && f.size > MAX_BYTES) {
        fileInput.value = "";
        drop.classList.remove("has-file");
        dropText.textContent = "Photo too large — 5 MB max, or text it instead";
        return;
      }
      drop.classList.toggle("has-file", !!f);
      dropText.textContent = f ? `Attached: ${f.name}` : "Tap to attach a photo of the job";
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (form._honey.value) return;
      status.className = "quote__status";
      status.textContent = "";
      submitBtn.disabled = true;
      submitBtn.querySelector("span").textContent = "Sending…";
      try {
        const res = await fetch(`https://formsubmit.co/ajax/${QUOTE_FORM_EMAIL}`, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("send failed");
        form.reset();
        drop.classList.remove("has-file");
        dropText.textContent = "Tap to attach a photo of the job";
        status.classList.add("is-ok");
        status.textContent = "REQUEST SENT — expect a reply within 24 hours. First time? Check for a FormSubmit activation email.";
      } catch {
        status.classList.add("is-err");
        status.textContent = "SEND FAILED — please call or text instead (details below).";
      } finally {
        submitBtn.disabled = false;
        submitBtn.querySelector("span").textContent = "Send quote request";
      }
    });
  }

  /* ── Gallery spotlight cursor ── */
  document.querySelectorAll(".frame__inner").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
      el.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
    });
  });
})();
