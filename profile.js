document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("profile");
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    container.innerHTML = `
      <section class="profile-card">
        <p>Du er ikke logget ind. <a href="login.html">Log ind her</a>.</p>
      </section>
    `;
    return;
  }

  container.innerHTML = `
    <section class="profile-card">
      <img src="${user.avatar}" alt="Profilbillede af ${user.fulde_navn}" class="profile-avatar" />
      <h1>${user.fulde_navn}</h1>
      <h2>${user.rolle}</h2>
      <p>${user.beskrivelse}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Telefon:</strong> ${user.telefon}</p>
      <button class="cta-button" id="logout" aria-label="log ud af din profil">Log ud</button>
    </section>

    <section class="course-card hidden-mobile">
      <div class="course-header">
        <h3>Mine kurser</h3>
        <a href="courses.html" class="cta-button">Se alle kurser</a>
      </div>
      <div class="course">
        <label>Kursus 1</label>
        <div class="progress-bar">
          <div class="progress" style="width: 90%"></div>
        </div>
        <span>90%</span>
      </div>
      <div class="course">
        <label>Kursus 2</label>
        <div class="progress-bar">
          <div class="progress" style="width: 60%"></div>
        </div>
        <span>60%</span>
      </div>
      <div class="course">
        <label>Kursus 3</label>
        <div class="progress-bar">
          <div class="progress" style="width: 30%"></div>
        </div>
        <span>30%</span>
      </div>
    </section>
  `;

  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });
});
