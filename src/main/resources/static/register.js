document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            interests: document.getElementById("interests").value,
            budget: document.getElementById("budget").value,
            preferredSeason: document.getElementById("preferredSeason").value
        })
    })
        .then(res => {
            if (res.ok) {
                alert("Registered successfully! Please log in.");
                window.location.href = "login.html";
            } else {
                alert("Registration failed.");
            }
        })
        .catch(err => {
            console.error("Error:", err);
            alert("An error occurred.");
        });
});
