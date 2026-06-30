function loadTheme() {
    const mode = localStorage.getItem("theme") || "light";
    if (mode === "dark") document.body.classList.add("dark");
}

function toggleTheme() {
    document.body.classList.toggle("dark");
    const mode = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", mode);
}

window.onload = loadTheme;
