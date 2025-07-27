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

    const btnSubmit = document.querySelector("#btnSubmit");
    const scorebox = document.querySelector("#scorebox");
    const corrAnsArray = ["Robert Baden-Powell", "Be Prepared", 6, "President's Scout Award"];

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
}
hamBtn.addEventListener("click", toggleMenus);

// === Carousel logic ===
const carouselTrack = document.getElementById("carouselTrack");
const leftBtn = document.querySelector(".carousel-btn.left");
const rightBtn = document.querySelector(".carousel-btn.right");

let scrollAmount = 0;
const slideWidth = carouselTrack.clientWidth;

function autoScrollCarousel() {
    scrollAmount += slideWidth;
    if (scrollAmount >= carouselTrack.scrollWidth) scrollAmount = 0;
    carouselTrack.scrollTo({ left: scrollAmount, behavior: "smooth" });
}
setInterval(autoScrollCarousel, 4000);

rightBtn.addEventListener("click", () => {
    scrollAmount += slideWidth;
    if (scrollAmount >= carouselTrack.scrollWidth) scrollAmount = 0;
    carouselTrack.scrollTo({ left: scrollAmount, behavior: "smooth" });
});

leftBtn.addEventListener("click", () => {
    scrollAmount -= slideWidth;
    if (scrollAmount < 0) scrollAmount = carouselTrack.scrollWidth - slideWidth;
    carouselTrack.scrollTo({ left: scrollAmount, behavior: "smooth" });
});
