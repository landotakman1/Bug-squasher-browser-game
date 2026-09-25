console.log("Bug Squasher Loading...");


const squashBtn = document.getElementById("squash-btn");
const feedback = document.getElementById("feedback");
const bugsElement = document.getElementById("bugs-squashed");
const scoreElement = document.getElementById("score");
const strongSquashBtn = document.getElementById("strong-squash");
const playArena = document.getElementById("play-arena");
const autoSquashBtn = document.getElementById("auto-squash");
const bugSprayBtn = document.getElementById("bug-spray");
const serverStatus = document.getElementById("server-status");
const onlineAt = 50;
const resetBtn = document.getElementById("reset-run");
const bugPad = 8;
const bugSpeedMin = 0.7;
const bugSpeedMax = 1.4;


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
let bugX = 0;
let bugY = 0;
let bugVX = 0.8;
let bugVY = 0.6;



function playSplat() {
    const tick = new Audio("sounds/universfield-slime-impact-352473.mp3");
    tick.volume = 0.1;
    tick.play().catch(function () {});
}

// VERY EXPERIMENTAL FEATURE: Reset Run
const SAVE_KEY = "bug-squasher-save";
let allowSave = true;


function saveGame() {
    if (!allowSave) {
        return;
    }
    const data = {
        score,
        bugsSquashed,
        pointsPerClick,
        strongSquashCost,
        autoSquashCost,
        bugSprayCost,
        autoSquashInterval,
        autoSquashLevel,
        autoPointsPerClick,
        bugSprayBonus
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

function loadGame() {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) {
        return;
    }
    const data = JSON.parse(raw);
    score = data.score;
    bugsSquashed = data.bugsSquashed;
    pointsPerClick = data.pointsPerClick;
    strongSquashCost = data.strongSquashCost;
    autoSquashCost = data.autoSquashCost;
    bugSprayCost = data.bugSprayCost;
    autoSquashInterval = data.autoSquashInterval;
    autoSquashLevel = data.autoSquashLevel;
    autoPointsPerClick = data.autoPointsPerClick;
    bugSprayBonus = data.bugSprayBonus;
    
    strongSquashBtn.textContent = `Stronger Click (${strongSquashCost} pts)`;
    autoSquashBtn.textContent = `Auto Squash (${autoSquashCost} pts)`;
    bugSprayBtn.textContent = `Bug Spray (${bugSprayCost} pts)`;
}

function resetRun() {
    const ok = confirm("Wipe this run? Score, upgrades, and auto-timer will all reset.");
    if (!ok) {
        return;
    }

    allowSave = false;

    if (autoSquashTimerId !== null) {
        clearInterval(autoSquashTimerId);
        autoSquashTimerId = null;
    }
    
    localStorage.removeItem(SAVE_KEY);
    location.reload();
}


function bugBounds() {
    const maxX = playArena.clientWidth - squashBtn.offsetWidth - bugPad * 2;
    const maxY = playArena.clientHeight - squashBtn.offsetHeight - bugPad * 2;
    return {
        minX: bugPad,
        minY: bugPad,
        maxX: bugPad + Math.max(maxX, 0),
        maxY: bugPad + Math.max(maxY, 0)
    };
}

function paintBug() {
    squashBtn.style.left = `${bugX}px`;
    squashBtn.style.top = `${bugY}px`;
}

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

    if (serverStatus) {
        if (bugsSquashed >= onlineAt) {
            serverStatus.textContent = "Production Server: ONLINE";
            serverStatus.classList.add("is-online");
        } else {
            serverStatus.textContent = "Production Server: OFFLINE";
            serverStatus.classList.remove("is-online");
        }
    }
    saveGame();
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

    playSplat();
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

    const b = bugBounds();
    bugX = b.minX + Math.floor(Math.random() * Math.max(b.maxX - b.minX, 0));
    bugY = b.minY + Math.floor(Math.random() * Math.max(b.maxY - b.minY, 0));

    const speed = bugSpeedMin + Math.random() * (bugSpeedMax - bugSpeedMin);
    const angle = Math.random() * Math.PI * 2;
    bugVX = Math.cos(angle) * speed;
    bugVY = Math.sin(angle) * speed;

    paintBug();
}

function slideBug() {
    if (!playArena || !squashBtn) return;

    const b = bugBounds();
    bugX += bugVX;
    bugY += bugVY;

    if (bugX <= b.minX || bugX >= b.maxX) {
        bugVX = -bugVX;
        bugX = Math.min(Math.max(bugX, b.minX), b.maxX);
    }
    if (bugY <= b.minY || bugY >= b.maxY) {
        bugVY = -bugVY;
        bugY = Math.min(Math.max(bugY, b.minY), b.maxY);
    }

    paintBug();
}

function startBugLoop() {
    function loop() {
        slideBug();
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
}


if (resetBtn) {resetBtn.addEventListener("click", resetRun);}

if (squashBtn) {squashBtn.addEventListener("click", squashBug);}

if (strongSquashBtn) {strongSquashBtn.addEventListener("click", strongSquashUpgrade);}

if (autoSquashBtn) {autoSquashBtn.addEventListener("click", autoSquashUpgrade);}

if (bugSprayBtn) {bugSprayBtn.addEventListener("click", bugSprayUpgrade);}


loadGame();
updateDisplay();
moveBug();
startBugLoop();


if (autoSquashLevel >= 1) {
    startAutoSquashTimer();
}