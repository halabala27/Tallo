document.addEventListener("DOMContentLoaded", function () {
    const closeButton = document.querySelector(".close-button");

    if (closeButton) {
        closeButton.addEventListener("click", function () {
            const currentUrl = window.location.href;
            const referrer = document.referrer;

            // Check if referrer exists and is different from current page
            if (referrer && referrer !== currentUrl) {
                window.location.href = referrer;
            } else {
                // Fallback to index.html if no valid referrer or same page
                window.location.href = 'index.html';
            }
        });
    }
});
