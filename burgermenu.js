const burger = document.getElementById('burger');
const nav = document.getElementById('mobile-nav');

burger.addEventListener('click', () => {
  nav.classList.toggle('show');
});

