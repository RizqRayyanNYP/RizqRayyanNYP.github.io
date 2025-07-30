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

  const btnSubmit = document.querySelector("#btnSubmit");
    const scorebox = document.querySelector("#scorebox");
    const corrAnsArray = ["Robert Baden-Powell", "Be Prepared", "6", "President's Scout Award"];

    function CheckAns() {
        let score = 0;
        for (let i = 0; i < corrAnsArray.length; i++) {
            score += CheckOneQn(i + 1, corrAnsArray[i]) ? 1 : 0;
        }
        scorebox.innerHTML = "Score: " + score;
    }

    function CheckOneQn(qnNo, CorrAns) {
        const selected = document.querySelector("input[name='q" + qnNo + "']:checked");
        return selected && selected.value === CorrAns;
    }

    btnSubmit.addEventListener("click", CheckAns);

// === Carousel logic ===
const track = document.getElementById("carouselTrack");
const leftBtn = document.querySelector(".carousel-btn.left");
const rightBtn = document.querySelector(".carousel-btn.right");
const slides = track.querySelectorAll("img");

let index = 0;

// Helper: Update the slide position
function updateSlide() {
  const slide = track.querySelector("img");
  const slideWidth = slide.offsetWidth;
  track.style.transform = `translateX(-${index * slideWidth}px)`;
}




// Resize handling
function handleResize() {
  updateSlide();
}

rightBtn.addEventListener("click", () => {
  index = (index + 1) % slides.length;
  updateSlide();
});

leftBtn.addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  updateSlide();
});

// Auto-scroll
setInterval(() => {
  index = (index + 1) % slides.length;
  updateSlide();
}, 4000);

// Setup
window.addEventListener("resize", handleResize);
window.addEventListener("load", handleResize);


const blowBtn = document.getElementById("blowBtn");
const meterFill = document.getElementById("meter-fill");
const resultText = document.getElementById("fireResult");

let meter = 0;
let intervalId = null;

// Extracted to reusable function
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
blowBtn.addEventListener("mouseleave", stopBlowing); // Optional

// Mobile Events
blowBtn.addEventListener("touchstart", function (e) {
  e.preventDefault(); // Prevents double-firing
  startBlowing();
});
blowBtn.addEventListener("touchend", function (e) {
  e.preventDefault();
  stopBlowing();
});

