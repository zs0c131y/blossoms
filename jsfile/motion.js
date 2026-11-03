// AOS progressively enhances the existing HTML; no content depends on it.
(() => {
  function initMotion() {
    if (!window.AOS) return;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const targets = new Map();
    document
      .querySelectorAll(
        ".reveal, .page-intro > *, .category-card, .programme-list li",
      )
      .forEach((element) => targets.set(element, 0));
    document
      .querySelectorAll(".discipline, .category-card")
      .forEach((element, index) => targets.set(element, (index % 4) * 100));
    let initialized = false;
    const updateMotion = () => {
      targets.forEach((delay, element) => {
        if (reducedMotion.matches) {
          element.removeAttribute("data-aos");
          element.removeAttribute("data-aos-delay");
          element.classList.remove("aos-init", "aos-animate");
        } else {
          element.setAttribute("data-aos", "fade-up");
          element.setAttribute("data-aos-delay", String(delay));
        }
      });
      if (reducedMotion.matches) {
        if (initialized) AOS.refreshHard();
        return;
      }
      if (!initialized) {
        AOS.init({
          duration: 650,
          easing: "ease-out-cubic",
          offset: 30,
          once: true,
          mirror: false,
        });
        initialized = true;
      } else AOS.refreshHard();
    };
    updateMotion();
    reducedMotion.addEventListener("change", updateMotion);
    const refresh = () => {
      if (initialized && !reducedMotion.matches) AOS.refresh();
    };
    window.addEventListener("load", refresh, { once: true });
    document
      .querySelectorAll('img[loading="lazy"]')
      .forEach((image) =>
        image.addEventListener("load", refresh, { once: true }),
      );
    document
      .querySelectorAll(".event-handbook details")
      .forEach((details) => details.addEventListener("toggle", refresh));
    document.addEventListener("focusin", (event) => {
      const target = event.target.closest("[data-aos]");
      if (target) target.classList.add("aos-animate");
    });
  }
  if (document.readyState === "complete") initMotion();
  else
    document.addEventListener("DOMContentLoaded", initMotion, { once: true });
})();
