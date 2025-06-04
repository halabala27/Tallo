document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("exam-popup");
    const closeBtn = document.getElementById("close-popup");

    if (!localStorage.getItem("examNoticeSeen")) {
        popup.style.display = "flex";
    }

    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
        localStorage.setItem("examNoticeSeen", "true");
    });
});