// Declare interval globally so we can clear it between inits
let intervalId;

function initCarousel() {
  const isCarouselActive = window.innerWidth >= 600 && window.innerWidth <= 1200;
  const carousel = document.getElementById("carousel");
  const dotsContainer = document.getElementById("dots");
  const boxes = document.querySelectorAll(".courses-content .box");
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");

  // Clear previous interval if it exists
  if (intervalId) clearInterval(intervalId);

  // Replace buttons to remove previous event listeners
  const leftBtnClone = leftBtn.cloneNode(true);
  const rightBtnClone = rightBtn.cloneNode(true);
  leftBtn.replaceWith(leftBtnClone);
  rightBtn.replaceWith(rightBtnClone);

  // Exit if not active or missing elements
  if (!isCarouselActive || !carousel || boxes.length === 0) return;

  let currentIndex = 0;
  const totalSlides = boxes.length;

  // Clear existing dots
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

  rightBtnClone.addEventListener("click", nextSlide);
  leftBtnClone.addEventListener("click", prevSlide);

  // Start auto scroll
  intervalId = setInterval(nextSlide, 7000);
}

// Initial run on load
window.addEventListener("load", initCarousel);

// Debounced resize handler
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    document.getElementById("dots").innerHTML = "";
    initCarousel();
  }, 300);
});