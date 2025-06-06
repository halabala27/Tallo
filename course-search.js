// The Input Section 
const searchInput = document.getElementById("course-search");
// The Courses Section
const courseBoxes = document.querySelectorAll(".course-box");

// Listen for input letters
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  // Check through h2 and p tags of the id="course-box"
  courseBoxes.forEach((box) => {
    const title = box.querySelector("h2")?.textContent.toLowerCase() || "";
    const description = box.querySelector("p")?.textContent.toLowerCase() || "";
    const isVisible = title.includes(value) || description.includes(value);
    // If value not present, hide the entire course
    box.classList.toggle("hidden", !isVisible);
  });
});






