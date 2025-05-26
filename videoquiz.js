// videoquiz.js

const videoContainer = document.querySelector(".video-container");
const video = document.getElementById("quiz-video");
const choiceContainer = document.getElementById("choice-container");
const choiceTextA = document.getElementById("choice-text-a");
const choiceTextB = document.getElementById("choice-text-b");
const buttons = document.querySelectorAll(".choice-button");

let state = "intro";
let returnToState = "intro";

// State-Machine
const logic = {
  intro: {
    video: "videos/intro.mp4",
    correctChoice: "A",
    onCorrect: "correct1",
    onWrong: "fail1",
    choiceTextA: "Jeg har brug for hjælp til at løse det...",
    choiceTextB: "Du ku' bare havde snakket med mig...",
  },
  correct1: {
    video: "videos/correct1.mp4",
    autoNext: "intro2",
  },
  intro2: {
    video: "videos/intro2.mp4",
    correctChoice: "B",
    onCorrect: "correct2",
    onWrong: "fail2",
    choiceTextA: "Jeg har brug for at du tager min vagt!",
    choiceTextB: "Jeg ville høre om du kunne tage min vagt?",
  },
  correct2: {
    video: "videos/correct2.mp4",
    autoNext: "ending",
  },
  fail1: {
    video: "videos/fail1.mp4",
    onEnd: "intro",
  },
  fail2: {
    video: "videos/fail2.mp4",
    onEnd: "intro2",
  },
  ending: {
    video: "videos/ending.mp4",
  },
};

// Play a given state: hide choices, load & play its video
function playState(newState) {
  state = newState;
  const data = logic[state];
  choiceContainer.style.display = "none";
  video.src = data.video;
  video.load();
  video.play();
}

// When any video ends...
video.addEventListener("ended", () => {
  // FINAL state: replace entire container with a static completion card
  if (state === "ending") {
    videoContainer.innerHTML = `
      <section class="completion-screen">
        <h2>Kurset er gennemført 🎉</h2>
        <p>Du har nu gennemført alle moduler.</p>
                <p>Læs mere forneden.</p>
        <button class="cta-button" onclick="window.location.href='courses.html'">
          Tilbage til kurser
        </button>

      </section>
    `;
    return;
  }

  // Otherwise follow your normal flow
  const data = logic[state];
  if (data.autoNext) {
    playState(data.autoNext);
  } else if (data.onEnd) {
    // fail2 should return to the previous intro state
    if (state === "fail2") playState(returnToState);
    else playState(data.onEnd);
  } else if (data.correctChoice) {
    // show the two choice buttons
    choiceTextA.textContent = data.choiceTextA;
    choiceTextB.textContent = data.choiceTextB;
    choiceContainer.style.display = "flex";
  }
});

// When the user clicks A or B
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const data = logic[state];
    const choice = btn.dataset.choice;
    choiceContainer.style.display = "none";
    if (choice === data.correctChoice) {
      playState(data.onCorrect);
    } else {
      returnToState = state;
      playState(data.onWrong);
    }
  });
});

// Initial setup
state = "intro";
video.src = logic[state].video;
video.load();
choiceContainer.style.display = "none";
