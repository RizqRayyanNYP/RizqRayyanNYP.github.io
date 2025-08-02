// === Target all elements ===
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const page4btn = document.querySelector("#page4btn");
const page5btn = document.querySelector("#page5btn");

const allpages = document.querySelectorAll(".page");
const menuItemsList = document.querySelector("nav ul");
const hamBtn = document.querySelector("#hamIcon");
const logoHome = document.querySelector("#logoHome");
const carouselWrapper = document.getElementById("carouselWrapper");
const scoutIntro = document.getElementById("scoutIntro");

// === Hide all subpages and homepage intro ===
function hideall() {
    for (let onepage of allpages) {
        onepage.style.display = "none";
    }
    carouselWrapper.style.display = "none";
    scoutIntro.style.display = "none";
}

// === Show one subpage ===
function show(pgno) {
    hideall();
    document.querySelector("#page" + pgno).style.display = "block";
}

// === Show homepage when logo is clicked ===
logoHome.addEventListener("click", function () {
    hideall();
    carouselWrapper.style.display = "block";
    scoutIntro.style.display = "block";
});

// === Button listeners ===
page1btn.addEventListener("click", function () { show(1); });
page2btn.addEventListener("click", function () { show(2); });
page3btn.addEventListener("click", function () { show(3); });
page4btn.addEventListener("click", function () { show(4); });
page5btn.addEventListener("click", function () { show(5); });

// === Start with homepage ===
hideall();
carouselWrapper.style.display = "block";
scoutIntro.style.display = "block";

// === Toggle Menu for Mobile ===
function toggleMenus() {
    menuItemsList.classList.toggle("menuShow");
    hamBtn.innerHTML = menuItemsList.classList.contains("menuShow") ? "Close Menu" : "Open Menu";
}
hamBtn.addEventListener("click", toggleMenus);

// quiz
  const quizQuestions = [
  {
    q: "Who founded the Scout Movement?",
    options: ["Frank Cooper Sands", "Robert Baden-Powell", "Lord Nelson", "Ernest Shackleton"],
    answer: "Robert Baden-Powell"
  },
  {
    q: "What is the Scout Motto?",
    options: ["Always Ready", "Help Others", "Be Prepared", "Do Your Best"],
    answer: "Be Prepared"
  },
  {
    q: "How many proficiency badges are there in Singapore Scouting?",
    options: ["4", "5", "6", "7"],
    answer: "6"
  },
  {
    q: "What is the most prestigious award that a Singapore Scout is able to attain?",
    options: ["Chief Commissioner's Award", "President's Scout Award", "National Service Badges"],
    answer: "President's Scout Award"
  }
];

const quizContainer = document.getElementById("quizContainer");
const btnSubmit = document.getElementById("btnSubmit");
const btnReset = document.getElementById("btnReset");
const scorebox = document.getElementById("scorebox");

const audioCorrect = document.getElementById("audio-correct");
const audioWrong = document.getElementById("audio-wrong");

// Render Quiz
function renderQuiz() {
  quizContainer.innerHTML = "";
  quizQuestions.forEach((item, idx) => {
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = (idx + 1) + ". " + item.q;
    fieldset.appendChild(legend);

    item.options.forEach(option => {
      const label = document.createElement("label");
      label.classList.add("quiz-option");
      label.innerHTML = `
        <input type="radio" name="q${idx + 1}" value="${option}"> ${option}
      `;
      fieldset.appendChild(label);
    });

    quizContainer.appendChild(fieldset);
  });
}
renderQuiz();

// Event Delegation for Option Highlight
quizContainer.addEventListener("click", function(e) {
  if (e.target.type === "radio") {
    // Remove highlight from all for this question
    const name = e.target.name;
    document.querySelectorAll(`input[name="${name}"]`).forEach(inp => {
      inp.parentElement.classList.remove("selected-option");
    });
    // Highlight selected
    e.target.parentElement.classList.add("selected-option");
  }
});

// Submit Quiz
btnSubmit.addEventListener("click", function() {
  let score = 0;
  let total = quizQuestions.length;
  let answered = 0;
  let allCorrect = true;

  // Remove previous feedback classes first
  document.querySelectorAll(".correct, .wrong").forEach(el => {
    el.classList.remove("correct", "wrong");
  });

  quizQuestions.forEach((item, idx) => {
    const sel = document.querySelector(`input[name="q${idx+1}"]:checked`);
    if (sel) {
      answered++;
      if (sel.value === item.answer) {
        score++;
        sel.parentElement.classList.add("correct");
      } else {
        sel.parentElement.classList.add("wrong");
        allCorrect = false;
      }
    } else {
      allCorrect = false;
    }
  });

  // Feedback
  if (answered < total) {
    scorebox.textContent = "Please answer all questions!";
  } else {
    scorebox.textContent = `Score: ${score} / ${total}`;
    // Play only one sound:
    if (allCorrect) {
      audioCorrect.currentTime = 0; audioCorrect.play();
    } else {
      audioWrong.currentTime = 0; audioWrong.play();
    }
  }
});

// Reset Quiz Button
btnReset.addEventListener("click", function() {
  document.getElementById("quizForm").reset();
  document.querySelectorAll(".selected-option, .correct, .wrong").forEach(el => {
    el.classList.remove("selected-option", "correct", "wrong");
  });
  scorebox.textContent = "Not submitted";
});

// Event Delegation for Accessibility: also support keyboard navigation
quizContainer.addEventListener("keyup", function(e) {
  if (e.target.type === "radio" && e.key === "Enter") {
    e.target.click();
  }
});

// Carousel logic
const track = document.getElementById("carouselTrack");
const leftBtn = document.querySelector(".carousel-btn.left");
const rightBtn = document.querySelector(".carousel-btn.right");
const slides = track.querySelectorAll("img");

let index = 0;
let isAnimating = false;

// Animate to target slide
function animateTo(newIndex) {
  if (isAnimating) return;
  isAnimating = true;
  const slide = track.querySelector("img");
  const slideWidth = slide.offsetWidth;
  const start = -index * slideWidth;
  const end = -newIndex * slideWidth;
  let startTime = null;

  function step(ts) {
    if (!startTime) startTime = ts;
    const progress = Math.min((ts - startTime) / 400, 1); // 400ms duration
    const current = start + (end - start) * progress;
    track.style.transform = `translateX(${current}px)`;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      index = newIndex;
      track.style.transform = `translateX(${-index * slideWidth}px)`;
      isAnimating = false;
    }
  }
  requestAnimationFrame(step);
}

// Resize handling
function handleResize() {
  // Snap to current position
  const slide = track.querySelector("img");
  const slideWidth = slide.offsetWidth;
  track.style.transform = `translateX(${-index * slideWidth}px)`;
}

rightBtn.addEventListener("click", () => {
  animateTo((index + 1) % slides.length);
});

leftBtn.addEventListener("click", () => {
  animateTo((index - 1 + slides.length) % slides.length);
});

// Auto-scroll
setInterval(() => {
  animateTo((index + 1) % slides.length);
}, 4000);

window.addEventListener("resize", handleResize);
window.addEventListener("load", handleResize);

// Fire game
const blowBtn = document.getElementById("blowBtn");
const meterFill = document.getElementById("meter-fill");
const resultText = document.getElementById("fireResult");

let meter = 0;
let intervalId = null;


function startBlowing() {
  resultText.textContent = "";
  clearInterval(intervalId); // prevent double intervals
  intervalId = setInterval(() => {
    if (meter < 100) {
      meter += 1;
      meterFill.style.width = meter + "%";
    } else {
      clearInterval(intervalId);
    }
  }, 50);
}

function stopBlowing() {
  clearInterval(intervalId);

  if (meter >= 40 && meter <= 60) {
    resultText.textContent = "🔥 Perfect! The fire starts.";
    resultText.style.color = "green";
  } else if (meter < 40) {
    resultText.textContent = "❄️ Too weak. Try blowing harder.";
    resultText.style.color = "blue";
  } else {
    resultText.textContent = "💨 Too strong! You blew it out!";
    resultText.style.color = "red";
  }

  meter = 0;
  meterFill.style.width = "0%";
}

// Desktop Events
blowBtn.addEventListener("mousedown", startBlowing);
blowBtn.addEventListener("mouseup", stopBlowing);

// Mobile Events
blowBtn.addEventListener("touchstart", function (e) {
  e.preventDefault(); // Prevents double-firing
  startBlowing();
});
blowBtn.addEventListener("touchend", function (e) {
  e.preventDefault();
  stopBlowing();
});

