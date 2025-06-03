document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  // 1) Toggle login/profile links
  const loginLink = document.getElementById("login-button");
  const profileLink = document.getElementById("profile-link");
  if (user) {
    loginLink?.style.setProperty("display", "none");
    profileLink?.style.setProperty("display", "inline-block");
  } else {
    loginLink?.style.setProperty("display", "inline-block");
    profileLink?.style.setProperty("display", "none");
  }

  // 2) Gate all course access buttons
  const courseLinks = document.querySelectorAll(".course-access");
  courseLinks.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (!user) {
        e.preventDefault();
        localStorage.setItem("redirectAfterLogin", btn.href);
        window.location.href = "login.html";
      }
    });
  });
});