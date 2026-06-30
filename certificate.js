// Format date like "18th April, 2026"
function formatDateWithOrdinal(date) {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    let suffix = "th";
    if (day % 10 === 1 && day !== 11) suffix = "st";
    else if (day % 10 === 2 && day !== 12) suffix = "nd";
    else if (day % 10 === 3 && day !== 13) suffix = "rd";

    return `${day}${suffix} ${month}, ${year}`;
}


function loadCertificate() {
    const user = localStorage.getItem("currentUser");
    if (!user) return;

    const progressData = JSON.parse(localStorage.getItem("progress") || "{}");
    const progress = progressData[user] || [];

    if (progress.length < 9) {
        document.getElementById("cert-container").innerHTML =
            "<p>You must complete atleast 9 modules to unlock your certificate.</p>";
        return;
    }

    const savedName = localStorage.getItem("certificateName_" + user);
    const locked = localStorage.getItem("certificateNameLocked_" + user);

    // If name already set and locked, disable editing
    if (savedName && locked) {
        document.getElementById("cert-input-name").value = savedName;
        document.getElementById("cert-input-name").disabled = true;
        document.getElementById("cert-input-password").disabled = true;
        document.querySelector("#save-cert-name-btn").style.display = "none";
        document.getElementsByClassName("name-setup")[0].style.display = "none";
    }

    // Display name on certificate
    if (savedName) {
        document.getElementById("cert-name").innerText = savedName;
    }

    // Format date
    const today = new Date();
    document.getElementById("cert-date").innerText = formatDateWithOrdinal(today);

    // Generate certificate ID
    const certId = "CERT-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    document.getElementById("cert-id").innerText = certId;
}

function authorizeCertificateName() {
    const user = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    const enteredName = document.getElementById("cert-input-name").value.trim();
    const enteredPassword = document.getElementById("cert-input-password").value;

    // Check if already locked
    if (localStorage.getItem("certificateNameLocked_" + user)) {
        alert("You have already set your certificate name. It cannot be changed again.");
        return;
    }

    if (!enteredName) {
        alert("Please enter a name for the certificate.");
        return;
    }

    if (!enteredPassword) {
        alert("Please enter your password for authorization.");
        return;
    }

    // Verify password
    if (!users[user] || users[user].password !== enteredPassword) {
        alert("Authorization failed. Incorrect password.");
        return;
    }

    // Save name permanently
    localStorage.setItem("certificateName_" + user, enteredName);
    localStorage.setItem("certificateNameLocked_" + user, "true");

    alert("Certificate name saved permanently.");

    // Update UI
    document.getElementById("cert-name").innerText = enteredName;
    document.getElementById("cert-input-name").disabled = true;
    document.getElementById("cert-input-password").disabled = true;
    document.querySelector("#save-cert-name-btn").style.display = "none";
}


// Download certificate as PNG
function downloadCertificate() {
    const cert = document.getElementById("certificate-area");

    html2canvas(cert).then(canvas => {
        const link = document.createElement("a");
        link.download = "certificate.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}
