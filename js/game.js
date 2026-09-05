console.log("Bug Squasher Loading...");

const squashBtn = document.getElementById("squash-btn");
const feedback = document.getElementById("feedback");
const bugsElement = document.getElementById("bugs-squashed");
const scoreElement = document.getElementById("score");
const strongSquashBtn = document.getElementById("strong-squash");
const playArena = document.getElementById("play-arena");

let score = 0;
let bugsSquashed = 0;
let pointsPerClick = 1;
let strongSquashCost = 10;


function costCheck() {
    if (score >= strongSquashCost) {
        strongSquashBtn.disabled = false;
    } else {
        strongSquashBtn.disabled = true;
    }
}

function updateDisplay() {
    scoreElement.textContent = score;
    bugsElement.textContent = bugsSquashed;
    costCheck();
}

function squashBug() {
    score = score + pointsPerClick;
    bugsSquashed++;
    updateDisplay();
    feedback.textContent = `Splat! + ${pointsPerClick}`;
    moveBug();
}

function strongSquashUpgrade() {
    pointsPerClick++;
    score = score - strongSquashCost;
    strongSquashCost = Math.ceil(strongSquashCost * 2.375);
    strongSquashBtn.textContent = `Stronger Click (${Math.ceil(strongSquashCost)} pts)`;
    updateDisplay();
}

function moveBug() {
    if (!playArena || !squashBtn) return;

    const maxX = playArena.clientWidth - squashBtn.offsetWidth;
    const maxY = playArena.clientHeight - squashBtn.offsetHeight;

    const x = Math.floor(Math.random() * Math.max(maxX, 0));
    const y = Math.floor(Math.random() * Math.max(maxY, 0));

    squashBtn.style.left = `${x}px`;
    squashBtn.style.top = `${y}px`;
    squashBtn.style.transform = "none";
}


if (squashBtn) {squashBtn.addEventListener("click", squashBug);}

updateDisplay();

if (strongSquashBtn) {strongSquashBtn.addEventListener("click", strongSquashUpgrade);}

