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

  // 2) Gate the "Start kursus" button
  const startBtn = document.getElementById("start-course-btn");
  if (startBtn) {
    startBtn.addEventListener("click", (e) => {
      if (!user) {
        e.preventDefault();
        // Remember where to go after successful login
        localStorage.setItem("redirectAfterLogin", startBtn.href);
        // Send them to login
        window.location.href = "login.html";
      }
    });
  }
});
