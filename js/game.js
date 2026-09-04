console.log("Bug Squasher Loading...");

const squashBtn = document.getElementById("squash-btn");
const feedback = document.getElementById("feedback");
const bugsElement = document.getElementById("bugs-squashed");
const scoreElement = document.getElementById("score");

let score = 0;
let bugsSquashed = 0;
let pointsPerClick = 1;

function updateDisplay() {
    scoreElement.textContent = score;
    bugsElement.textContent = bugsSquashed;
}

function squashBug() {
    score = score + pointsPerClick;
    bugsSquashed++;
    updateDisplay();
    feedback.textContent = `Splat! + ${pointsPerClick}`;
}



if (squashBtn) {squashBtn.addEventListener("click", squashBug);}

updateDisplay();