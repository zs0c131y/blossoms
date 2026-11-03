(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-links");
  if (toggle && navigation) {
    const closeMenu = () => {
      navigation.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    };
    toggle.addEventListener("click", () => {
      const open = navigation.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    navigation.addEventListener("click", (e) => {
      if (e.target.closest("a")) closeMenu();
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".site-nav")) closeMenu();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navigation.classList.contains("is-open")) {
        closeMenu();
        toggle.focus();
      }
    });
    window
      .matchMedia("(min-width: 801px)")
      .addEventListener("change", closeMenu);
  }
  const canvas = document.getElementById("starfield");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  let width = 0,
    height = 0,
    stars = [],
    frame = 0,
    animation = null;
  let previousTime = 0;
  let meteor = null;
  let nextMeteor = performance.now() + 6000;
  const draw = (now = performance.now()) => {
    const delta = previousTime ? Math.min(now - previousTime, 50) : 16;
    previousTime = now;
    ctx.clearRect(0, 0, width, height);
    stars.forEach((star) => {
      const alpha = reducedMotion.matches
        ? star.alpha
        : star.alpha * (0.65 + 0.35 * Math.sin(frame * 0.008 + star.phase));
      ctx.fillStyle = `rgba(231,215,189,${alpha})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    if (!reducedMotion.matches) {
      if (!meteor && now >= nextMeteor) {
        meteor = {
          x: width * (0.35 + Math.random() * 0.65),
          y: height * Math.random() * 0.25,
          age: 0,
        };
      }
      if (meteor) {
        meteor.age += delta;
        meteor.x -= delta * 0.5;
        meteor.y += delta * 0.22;
        const opacity =
          Math.sin(Math.min(meteor.age / 1000, 1) * Math.PI) * 0.7;
        const trail = ctx.createLinearGradient(
          meteor.x,
          meteor.y,
          meteor.x + 95,
          meteor.y - 42,
        );
        trail.addColorStop(0, `rgba(215,227,255,${opacity})`);
        trail.addColorStop(1, "rgba(180,206,255,0)");
        ctx.strokeStyle = trail;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(meteor.x + 95, meteor.y - 42);
        ctx.stroke();
        if (meteor.age >= 1000) {
          meteor = null;
          nextMeteor = now + 7000 + Math.random() * 5000;
        }
      }
    } else meteor = null;
    frame += delta / 16.67;
    if (!reducedMotion.matches && !document.hidden)
      animation = requestAnimationFrame(draw);
  };
  const stop = () => {
    cancelAnimationFrame(animation);
    animation = null;
  };
  const resize = () => {
    stop();
    width = innerWidth;
    height = innerHeight;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    stars = Array.from(
      { length: Math.min(180, Math.floor((width * height) / 8500)) },
      () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.8 + 0.25,
        alpha: Math.random() * 0.45 + 0.12,
        phase: Math.random() * Math.PI * 2,
      }),
    );
    draw();
  };
  window.addEventListener("resize", resize, { passive: true });
  document.addEventListener("visibilitychange", () => {
    stop();
    if (!document.hidden) draw();
  });
  reducedMotion.addEventListener("change", () => {
    stop();
    draw();
  });
  resize();
})();
