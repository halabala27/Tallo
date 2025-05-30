
function initCarousel() {
  const isCarouselActive = window.innerWidth >= 600 && window.innerWidth <= 1200;
  const carousel = document.getElementById("carousel");
  const dotsContainer = document.getElementById("dots");
  const boxes = document.querySelectorAll(".courses-content .box");
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");

  if (!isCarouselActive || !carousel || boxes.length === 0) return;

  let currentIndex = 0;
  const totalSlides = boxes.length;

  // Clear old dots
  dotsContainer.innerHTML = "";

  // Create dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => scrollToSlide(i));
    dotsContainer.appendChild(dot);
  }

  const updateDots = () => {
    document.querySelectorAll(".dot").forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentIndex);
    });
  };

  const scrollToSlide = (index) => {
    const width = carousel.clientWidth;
    carousel.scrollTo({
      left: width * index,
      behavior: "smooth",
    });
    currentIndex = index;
    updateDots();
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    scrollToSlide(currentIndex);
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    scrollToSlide(currentIndex);
  };

  rightBtn.addEventListener("click", nextSlide);
  leftBtn.addEventListener("click", prevSlide);

  setInterval(nextSlide, 7000); // Auto scroll
}

window.addEventListener("load", initCarousel);
window.addEventListener("resize", () => {
  location.reload(); // Simplest way to re-init layout when resizing
});

