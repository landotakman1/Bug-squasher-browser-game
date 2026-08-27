console.log("Bug Squasher Loading...");

const squashBtn = document.getElementById("squash-btn");
const feedback = document.getElementById("feedback");

if (squashBtn) {
    squashBtn.addEventListener("click", function () {
        feedback.textContent = "Where do you see a bug?! Bugs Coming Soon!... Chill";
    });
}