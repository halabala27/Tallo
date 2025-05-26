const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const isLoginPage = window.location.pathname.includes("login.html");

// If not logged in and not on login-page
if (!loggedInUser && !isLoginPage) {
  localStorage.setItem("redirectAfterLogin", window.location.href);
}