function goBackOrRedirect() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const redirect = localStorage.getItem("redirectAfterLogin");
  const fallback = "profile.html"; // Default destination after login

  if (redirect) {
    localStorage.removeItem("redirectAfterLogin");
    window.location.href = redirect;
  } else if (user) {
    window.location.href = fallback;
  } else {
    window.location.href = "login.html"; // Safety net
  }
}
