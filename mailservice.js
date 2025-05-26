(function () {
  emailjs.init({
    publicKey: "A8x1BxfhePXOTllc9"
  });
})();

function sendMail() {
  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const messageInput = document.querySelector("#message");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  // Validate name
  if (name.length === 0) {
    alert("Indtast venligst dit navn.");
    nameInput.focus();
    return;
  }

  // Validate email via HTML5 constraint API
  if (!emailInput.checkValidity()) {
    alert("Indtast en gyldig e-mailadresse.");
    emailInput.focus();
    return;
  }

  // Validate message
  if (message.length === 0) {
    alert("Skriv venligst en besked.");
    messageInput.focus();
    return;
  }

  // All good — send the email
  const templateParams = { name, email, message };

  emailjs
    .send("service_qf9y2xn", "template_a96hr8r", templateParams)
    .then(() => {
      alert("Email sendt!");
      // Optionally, clear the form:
      // nameInput.value = emailInput.value = messageInput.value = "";
    })
    .catch(() => {
      alert("Email ikke sendt. Prøv igen senere.");
    });
}
