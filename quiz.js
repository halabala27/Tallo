const quizData = [
  {
    question: "Hvilket udsagn er mest effektivt til at nedtrappe en konflikt?",
    options: ["Du forstår aldrig, hvad jeg prøver at sige.", "Jeg føler mig overset, når mine synspunkter ikke bliver hørt.", "Du laver altid fejl, og det er frustrerende.", "Det er din skyld, at det ikke fungerer."],
    correct: "Jeg føler mig overset, når mine synspunkter ikke bliver hørt."
  },
  {
    question: "Hvordan undgår man bedst at eskalere en konflikt med sprog?",
    options: ["Du er altid så langsom til at svare.", "Jeg oplever, at vi ikke kommunikerer effektivt lige nu.", "Du lytter aldrig ordentligt!", "Jeg synes, du er uretfærdig."],
    correct: "Jeg oplever, at vi ikke kommunikerer effektivt lige nu."
  },
  {
    question: "Hvilket udsagn viser en respektfuld måde at udtrykke utilfredshed på?",
    options: ["Du hører aldrig efter!", "Jeg bliver bekymret, når mine idéer ikke bliver taget seriøst.", "Det er din skyld, at tingene går galt.", "Hvorfor kan du ikke bare gøre det rigtigt?"],
    correct: "Jeg bliver bekymret, når mine idéer ikke bliver taget seriøst."
  }
];

let currentQuestion = 0;
let score = 0;
let answering = true;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const retakeBtn = document.getElementById("retake-btn");
const quizContainer = document.getElementById("quiz-container");

function showQuestion() {
  answering = true;
  const question = quizData[currentQuestion];
  questionEl.innerText = question.question;
  optionsEl.innerHTML = "";  // Clear previous options

  // Loop through the options and create a button for each one
  question.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.classList.add("option-btn");  // Add the class here
    btn.addEventListener("click", () => selectAnswer(btn, option));
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(selectedBtn, selected) {
  if (!answering) return;
  answering = false;

  const correct = quizData[currentQuestion].correct;

  // Highlight answers
  Array.from(optionsEl.children).forEach(btn => {
    if (btn.innerText === correct) {
      btn.classList.add("correct");
    } else if (btn.innerText === selected) {
      btn.classList.add("incorrect");
    }
    btn.disabled = true;  // Disable buttons after selection
  });

  if (selected === correct) {
    score++;
  }

  nextBtn.classList.add("visible");
}

function showResult() {
  quizContainer.style.display = 'none';  // Hide the quiz
  resultEl.innerText = `Du havde ${score} rigtige ud af ${quizData.length}`;

  // Save score to localStorage
  localStorage.setItem('lastQuizScore', score);

  // Show the "Retake Quiz" button
  retakeBtn.style.display = "inline-block";
}

function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  retakeBtn.style.display = "none";
  resultEl.innerText = "";
  quizContainer.style.display = 'block';
  showQuestion();
}

// Optional: Show the last stored score
const lastScore = localStorage.getItem('lastQuizScore');
if (lastScore !== null) {
  resultEl.innerText = `Sidst fik du ${lastScore} rigtige`;
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  nextBtn.classList.remove("visible");

  if (currentQuestion < quizData.length) {
    showQuestion();  // Load next question
  } else {
    showResult();  // Show the result when quiz is finished
  }
});

retakeBtn.addEventListener("click", resetQuiz);

showQuestion();  // Start the quiz
