document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    fetch('/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
    })
        .then(res => {
            if (!res.ok) {
                throw new Error("Login failed. Please check your credentials.");
            }
            return res.json();
        })
        .then(data => {
            if (data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("name", data.name);
                localStorage.setItem("role", data.role);
                alert("Login successful!");
                window.location.href = "index.html";
            } else {
                alert("Login failed. Please check your credentials.");
            }
        })
        .catch(err => {
            console.error("Error:", err);
            alert(err.message || "An error occurred.");
        });
});
