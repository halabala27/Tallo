const backToTopBtn = document.querySelector(".btt");
let ticking = false;

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 0) {
          backToTopBtn.classList.add("visible");
        } else {
          backToTopBtn.classList.remove("visible");
        }
        ticking = false;
      });
      ticking = true;
    }
  },
  { passive: true }
);
