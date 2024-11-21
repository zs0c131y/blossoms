document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const loadingScreen = document.querySelector(".loading-screen");
  const mainContent = document.querySelector(".main-content");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;

  // Loading screen logic
  setTimeout(() => {
    loadingScreen.classList.add("fade-out");
    mainContent.classList.add("visible");
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, 5000);

  // Mobile menu toggle
  mobileMenuBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    this.classList.toggle("active");
    navLinks.classList.toggle("active");
    body.style.overflow = this.classList.contains("active") ? "hidden" : "";
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
      mobileMenuBtn.classList.remove("active");
      navLinks.classList.remove("active");
      body.style.overflow = "";
    }
  });

  // Prevent clicks inside nav-links from closing the menu
  navLinks.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      mobileMenuBtn.classList.remove("active");
      navLinks.classList.remove("active");
      body.style.overflow = "";
    }
  });

  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Animation for event categories
  const eventCategories = document.querySelectorAll(".event-category");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "20px",
    }
  );

  eventCategories.forEach((category) => {
    category.style.opacity = "0";
    category.style.transform = "translateY(20px)";
    category.style.transition = "all 0.5s ease-out";
    observer.observe(category);
  });

  // Handle resize events
  let resizeTimer;
  window.addEventListener("resize", () => {
    // Prevent animation issues during resize
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.body.classList.remove("resize-animation-stopper");
    }, 400);

    // Reset mobile menu on resize
    if (window.innerWidth > 768) {
      mobileMenuBtn.classList.remove("active");
      navLinks.classList.remove("active");
      body.style.overflow = "";
    }
  });
});
