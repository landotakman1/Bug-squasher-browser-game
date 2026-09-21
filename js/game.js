console.log("Bug Squasher Loading...");

const squashBtn = document.getElementById("squash-btn");
const feedback = document.getElementById("feedback");
const bugsElement = document.getElementById("bugs-squashed");
const scoreElement = document.getElementById("score");
const strongSquashBtn = document.getElementById("strong-squash");
const playArena = document.getElementById("play-arena");
const autoSquashBtn = document.getElementById("auto-squash");
const bugSprayBtn = document.getElementById("bug-spray");

let score = 0;
let bugsSquashed = 0;
let pointsPerClick = 1;
let strongSquashCost = 10;
let autoSquashCost = 25;
let bugSprayCost = 50;
let autoSquashInterval = 4000;
let autoSquashLevel = 0;
let autoSquashStrengthInterval = [5, 10, 15, 20, 25];
let autoPointsPerClick = 1;
let autoSquashTimerId = null;
let bugSprayBonus = 1;


function costCheck() {
    if (score >= strongSquashCost) {
        strongSquashBtn.disabled = false;
    } else {
        strongSquashBtn.disabled = true;
    }

    if (score >= autoSquashCost) {
        autoSquashBtn.disabled = false;
    } else {
        autoSquashBtn.disabled = true;
    }

    if (score >= bugSprayCost) {
        bugSprayBtn.disabled = false;
    } else {
        bugSprayBtn.disabled = true;
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
    squashBtn.classList.remove("is-hit");
    void squashBtn.offsetWidth;
    squashBtn.classList.add("is-hit");
    setTimeout(function() {
        squashBtn.classList.remove("is-hit");
    }, 120);
}

function autoSquash() {
    score = score + autoPointsPerClick;
    bugsSquashed++;
    updateDisplay();
    feedback.textContent = `Auto Splat! + ${autoPointsPerClick}`;
}

function strongSquashUpgrade() {
    pointsPerClick++;
    score = score - strongSquashCost;
    strongSquashCost = Math.ceil(strongSquashCost * 2.375);
    strongSquashBtn.textContent = `Stronger Click (${Math.ceil(strongSquashCost)} pts)`;
    updateDisplay();
}

function startAutoSquashTimer() {
    if (autoSquashTimerId !== null) {
        clearInterval(autoSquashTimerId);
    }
    autoSquashTimerId = setInterval(autoSquash, autoSquashInterval);
}

function autoSquashUpgrade() {
    if (autoSquashLevel >= 1) {autoSquashInterval = autoSquashInterval * 0.875;}
    if (autoSquashStrengthInterval.includes(autoSquashLevel)) {autoPointsPerClick++}
    score = score - autoSquashCost;
    startAutoSquashTimer();
    autoSquashCost = Math.ceil(autoSquashCost * 2.85);
    autoSquashBtn.textContent = `Auto Squash (${Math.ceil(autoSquashCost)} pts)`;
    autoSquashLevel++;
    updateDisplay();
}

function bugSprayUpgrade() {
    pointsPerClick = pointsPerClick + bugSprayBonus;
    autoPointsPerClick = autoPointsPerClick + bugSprayBonus;
    bugSprayBonus++;
    score = score - bugSprayCost;
    bugSprayCost = Math.ceil(bugSprayCost * 3.45);
    bugSprayBtn.textContent = `Bug Spray (${Math.ceil(bugSprayCost)} pts)`;
    updateDisplay();
}

function moveBug() {
    if (!playArena || !squashBtn) return;

    const pad = 8;
    const maxX = playArena.clientWidth - squashBtn.offsetWidth - pad * 2;
    const maxY = playArena.clientHeight - squashBtn.offsetHeight - pad * 2;

    const x = pad + Math.floor(Math.random() * Math.max(maxX, 0));
    const y = pad + Math.floor(Math.random() * Math.max(maxY, 0));

    squashBtn.style.left = `${x}px`;
    squashBtn.style.top = `${y}px`;
}


if (squashBtn) {squashBtn.addEventListener("click", squashBug);}


if (strongSquashBtn) {strongSquashBtn.addEventListener("click", strongSquashUpgrade);}


if (autoSquashBtn) {autoSquashBtn.addEventListener("click", autoSquashUpgrade);}

if (bugSprayBtn) {bugSprayBtn.addEventListener("click", bugSprayUpgrade);}

updateDisplay();

moveBug();