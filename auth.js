function registerUser() {
    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;

    if (!username || !password) {
        alert("All fields required");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[username]) {
        alert("Username already exists");
        return;
    }

    users[username] = { password, score: 0 };
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful");
    window.location.href = "login.html";
}

function loginUser() {
    const username = document.getElementById("log-username").value;
    const password = document.getElementById("log-password").value;

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (!users[username] || users[username].password !== password) {
        alert("Invalid login");
        return;
    }

    localStorage.setItem("currentUser", username);
    alert("Login successful");
    window.location.href = "dashboard.html";
}

function logoutUser() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
