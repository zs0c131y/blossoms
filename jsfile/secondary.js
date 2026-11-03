document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".mobile-menu-btn");
  const links = document.querySelector(".nav-links");
  if (!button || !links) return;
  const syncState = () =>
    button.setAttribute(
      "aria-expanded",
      String(links.classList.contains("active")),
    );
  const closeMenu = () => {
    button.classList.remove("active");
    links.classList.remove("active");
    document.body.style.overflow = "";
    syncState();
  };
  // Event and results pages retain their existing toggle handlers.
  if (!document.querySelector(".events-list, .results-container")) {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
      links.classList.toggle("active");
    });
  }
  new MutationObserver(syncState).observe(links, {
    attributes: true,
    attributeFilter: ["class"],
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && links.classList.contains("active")) {
      closeMenu();
      button.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!button.contains(event.target) && !links.contains(event.target))
      closeMenu();
  });
  links.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  window.matchMedia("(min-width: 801px)").addEventListener("change", closeMenu);
});
