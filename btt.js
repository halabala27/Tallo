const backToTopBtn = document.querySelector(".btt");

// Show/hide button on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
});


// Scroll to top on click
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
