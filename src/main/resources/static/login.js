document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem("token", data.token);
                alert("Login successful!");
                window.location.href = "recommendations.html"; // will build next
            } else {
                alert("Login failed. Please check your credentials.");
            }
        })
        .catch(err => {
            console.error("Error:", err);
            alert("An error occurred.");
        });
});
