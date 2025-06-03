// === Hardcoded Users ===
const users = [
  {
    username: "lene",
    password: "1234",
    avatar: "img/lene-update.jpg",
    fulde_navn: "Lene Juhl Nielsen",
    email: "ljni@cphbusiness.dk",
    telefon: "+45 36 15 49 37",
    beskrivelse: "Kommunikationskonsulent med fokus på inkluderende dialog.",
    rolle: "Lektor - Innovation og Teknologi",
  },
  {
    username: "ditlev",
    password: "pass",
    avatar: "img/ditlev-update.jpg",
    fulde_navn: "Ditlev Skanderby",
    email: "dsk@cphbusiness.dk",
    telefon: "+45 36 15 47 17",
    beskrivelse: "Specialist i brugeroplevelser og digital design.",
    rolle: "Adjunkt - Innovation og Teknologi",
  },
  {
    username: "marc",
    password: "abcd",
    avatar: "img/marc-update.jpg",
    fulde_navn: "Marc Kluge",
    email: "klu@cphbusiness.dk",
    telefon: "+45 36 15 47 32",
    beskrivelse: "Ansvarlig for backend og teknisk implementering.",
    rolle: "Programleder - Innovation og Teknologi",
  },
];

let currentUser = null;

// === Helpers ===
function saveUserToLocalStorage(user) {
  localStorage.setItem("loggedInUser", JSON.stringify(user));
}
function clearUserFromLocalStorage() {
  localStorage.removeItem("loggedInUser");
}
function checkStoredUser() {
  const stored = localStorage.getItem("loggedInUser");
  if (stored) currentUser = JSON.parse(stored);
}
checkStoredUser();

function handleLogin(event) {
  event.preventDefault();
  const inputUsername = document.getElementById("username").value.trim();
  const inputPassword = document.getElementById("password").value.trim();
  const errorEl = document.getElementById("login-error");

  const matchedUser = users.find(
    (u) => u.username === inputUsername && u.password === inputPassword
  );

  if (matchedUser) {
    currentUser = matchedUser;
    saveUserToLocalStorage(currentUser);

    const redirect = localStorage.getItem("redirectAfterLogin");
    if (redirect) {
      localStorage.removeItem("redirectAfterLogin");
      window.location.href = redirect;
    } else {
      window.location.href = "profile.html";
    }
  } else {
    errorEl.textContent = "Ugyldigt brugernavn eller adgangskode.";
  }
}

// === Wire up button + Enter key on inputs ===
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("submit-login");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  loginBtn?.addEventListener("click", handleLogin);

  [usernameInput, passwordInput].forEach((input) => {
    input?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleLogin(e);
      }
    });
  });
});
