function markModuleComplete(moduleName) {
    const user = localStorage.getItem("currentUser");
    if (!user) return;

    const progress = JSON.parse(localStorage.getItem("progress") || "{}");

    if (!progress[user]) progress[user] = [];

    if (!progress[user].includes(moduleName)) {
        progress[user].push(moduleName);
        localStorage.setItem("progress", JSON.stringify(progress));
    }
}

function getProgress() {
    const user = localStorage.getItem("currentUser");
    const progress = JSON.parse(localStorage.getItem("progress") || "{}");
    return progress[user] || [];
}
