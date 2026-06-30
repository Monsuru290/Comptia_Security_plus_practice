function updateLeaderboard(score) {
    const user = localStorage.getItem("currentUser");
    const board = JSON.parse(localStorage.getItem("leaderboard") || "[]");

    board.push({
        user,
        score,
        date: new Date().toLocaleDateString()
    });

    board.sort((a, b) => b.score - a.score);

    localStorage.setItem("leaderboard", JSON.stringify(board));
}

function getLeaderboard() {
    return JSON.parse(localStorage.getItem("leaderboard") || "[]");
}
