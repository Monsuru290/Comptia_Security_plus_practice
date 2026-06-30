let qIndex = 0;
let score = 0;

function loadQuestion() {
    const q = questions[qIndex];
    document.getElementById("question").innerText = q.q;

    const options = document.getElementById("options");
    options.innerHTML = "";

    q.a.forEach((opt, i) => {
        const btn = document.createElement("div");
        btn.className = "quiz-option";
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(i);
        options.appendChild(btn);
    });
}

function checkAnswer(choice) {
    if (choice === questions[qIndex].correct) score++;

    qIndex++;

    if (qIndex >= questions.length) {
        finishQuiz();
    } else {
        loadQuestion();
    }
}

function finishQuiz() {
    alert("Quiz complete! Score: " + score);

    const user = localStorage.getItem("currentUser");
    updateLeaderboard(score);

    markModuleComplete(moduleKey);

    if (score === questions.length) {
        awardBadge("Perfect Score: " + moduleKey);
    }

    window.location.href = "dashboard.html";
}
