function awardBadge(badgeName) {
    const user = localStorage.getItem("currentUser");
    const badges = JSON.parse(localStorage.getItem("badges") || "{}");

    if (!badges[user]) badges[user] = [];

    if (!badges[user].includes(badgeName)) {
        badges[user].push(badgeName);
        localStorage.setItem("badges", JSON.stringify(badges));
    }
}

function getBadges() {
    const user = localStorage.getItem("currentUser");
    const badges = JSON.parse(localStorage.getItem("badges") || "{}");
    return badges[user] || [];
}
