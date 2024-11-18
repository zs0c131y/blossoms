// Add smooth scrolling to navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Add fade-in animation to event categories on scroll
const eventCategories = document.querySelectorAll(".event-category");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
});

eventCategories.forEach((category) => {
  category.style.opacity = 0;
  category.style.transform = "translateY(20px)";
  category.style.transition = "all 0.5s ease-out";
  observer.observe(category);
});
