//target all elements to save to constants
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const page4btn = document.querySelector("#page4btn");
const page5btn = document.querySelector("#page5btn");

var allpages = document.querySelectorAll(".page");
const menuItemsList = document.querySelector("nav ul");
const hamBtn = document.querySelector("#hamIcon");
hamBtn.addEventListener("click", toggleMenus);
//select all subtopic pages
function hideall() { //function to hide all pages
    for (let onepage of allpages) { //go through all subtopic pages
        onepage.style.display = "none"; //hide it
    }
}
function show(pgno) { //function to show selected page no
    hideall();
    //select the page based on the parameter passed in
    let onepage = document.querySelector("#page" + pgno);
    onepage.style.display = "block"; //show the page
}
/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {
    show(1);
});
page2btn.addEventListener("click", function () {
    show(2);
});
page3btn.addEventListener("click", function () {
    show(3);
});
page4btn.addEventListener("click", function () {
    show(4);
});
page5btn.addEventListener("click", function () {
    show(5);
});
hideall();


function toggleMenus() { /*open and close menu*/
    // if menuItemsList dont have the class "menuShow", add it, else remove it
    menuItemsList.classList.toggle("menuShow");
    // if menu is showing (has the class "menuShow")
    if (menuItemsList.classList.contains("menuShow")) {
        hamBtn.innerHTML = "Close Menu"; //change button text to chose menu
    } else { //if menu NOT showing
        hamBtn.innerHTML = "Open Menu"; //change button text open menu
    }

    const btnSubmit = document.querySelector("#btnSubmit");
    const scorebox = document.querySelector("#scorebox");
    var q1, q2, score = 0;
    corrAnsArray = ["Robert Baden-Powell", "Be Prepared", 6, "President's Scout Award"];
    function CheckAns() {
        score = 0; //reset score to 0, check ans and give score if correct
        for (let i = 0; i < corrAnsArray.length; i++) {
            CheckOneQn(i + 1, corrAnsArray[i]);
        }
        scorebox.innerHTML = "Score:" + score;
    }
    btnSubmit.addEventListener("click", CheckAns);
    function CheckOneQn(qnNo, CorrAns) {
        qTemp = document.querySelector("input[name='q" + qnNo + "']:checked").value;
        if (qTemp == CorrAns) score++;
        console.log(qTemp); //check q1 value retrieved
    }

}


