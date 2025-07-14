window.onload = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
        alert("Please log in first.");
        window.location.href = "login.html";
        return;
    }

    // Elements
    const recommendLink = document.getElementById("recommendLink");
    const profileMenu = document.getElementById("profileMenu");
    const profileIcon = document.getElementById("profileIcon");
    const profileDropdown = document.getElementById("profileDropdown");
    const logoutLink = document.getElementById("logoutLink");
    const darkToggle = document.getElementById("darkToggle");
    const usernameElem = document.getElementById("username");
    const emailElem = document.getElementById("email");
    const avatarElem = document.getElementById("avatar");

    // Show recommendations and profile menu since logged in
    recommendLink.style.display = "inline";
    profileMenu.style.display = "inline-block";

    // Profile menu toggle
    profileIcon.addEventListener("click", () => {
        profileDropdown.style.display = profileDropdown.style.display === "block" ? "none" : "block";
    });

    // Hide profile dropdown if clicked outside
    window.addEventListener("click", (e) => {
        if (!profileIcon.contains(e.target) && !profileDropdown.contains(e.target)) {
            profileDropdown.style.display = "none";
        }
    });

    // Logout handler
    logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = "index.html";
    });

    // Dark mode toggle init
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark");
    }

    darkToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem("darkMode", document.body.classList.contains("dark"));
    });

    // User data container
    let currentUser = {};

    // Fetch user data on load
    fetch(`/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(res => {
            if (!res.ok) throw new Error("Failed to fetch user data");
            return res.json();
        })
        .then(user => {
            currentUser = user;
            usernameElem.textContent = user.name || "User";
            emailElem.textContent = user.email || "";
            avatarElem.src = user.avatarUrl || avatarElem.src;
        })
        .catch(() => {
            usernameElem.textContent = "User";
            emailElem.textContent = "";
            avatarElem.src = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp";
        });

    // --- Edit Profile Toggle ---
    const editToggle = document.getElementById("editToggle");
    const editContent = document.getElementById("editContent");
    const editArrow = document.getElementById("editArrow");

    editToggle.addEventListener("click", () => {
        const open = editContent.style.display === "block";
        editContent.style.display = open ? "none" : "block";
        editArrow.classList.toggle("rotate", !open);
        if (!open) {
            document.getElementById("name").value = currentUser.name || "";
            document.getElementById("emailInput").value = currentUser.email || "";
            document.getElementById("avatarUrl").value = currentUser.avatarUrl || "";
            document.getElementById("editMessage").textContent = "";
        }
    });

    // Edit Profile Form submit
    document.getElementById("editForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const payload = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("emailInput").value.trim(),
            avatarUrl: document.getElementById("avatarUrl").value.trim(),
        };
        fetch(`/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        })
            .then(res => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then(updated => {
                document.getElementById("editMessage").style.color = "green";
                document.getElementById("editMessage").textContent = "Profile updated!";
                currentUser = { ...currentUser, ...payload };
                usernameElem.textContent = payload.name;
                emailElem.textContent = payload.email;
                avatarElem.src = payload.avatarUrl || avatarElem.src;
            })
            .catch(() => {
                document.getElementById("editMessage").style.color = "red";
                document.getElementById("editMessage").textContent = "Update failed.";
            });
    });

    // --- Change Password Toggle ---
    const passwordToggle = document.getElementById("passwordToggle");
    const passwordContent = document.getElementById("passwordContent");
    const passwordArrow = document.getElementById("passwordArrow");

    passwordToggle.addEventListener("click", () => {
        const open = passwordContent.style.display === "block";
        passwordContent.style.display = open ? "none" : "block";
        passwordArrow.classList.toggle("rotate", !open);
        document.getElementById("passwordMessage").textContent = "";
        document.getElementById("passwordForm").reset();
    });

    // Change Password Form submit
    document.getElementById("passwordForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const payload = {
            currentPassword: document.getElementById("currentPassword").value,
            newPassword: document.getElementById("newPassword").value,
        };
        fetch(`/users/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        })
            .then(res => {
                if (!res.ok) throw new Error();
                return res.text();
            })
            .then(msg => {
                document.getElementById("passwordMessage").style.color = "green";
                document.getElementById("passwordMessage").textContent = msg || "Password updated!";
                e.target.reset();
            })
            .catch(() => {
                document.getElementById("passwordMessage").style.color = "red";
                document.getElementById("passwordMessage").textContent = "Password update failed.";
            });
    });

    // --- Preferences Toggle ---
    const preferencesToggle = document.getElementById("preferencesToggle");
    const preferencesContent = document.getElementById("preferencesContent");
    const preferencesArrow = document.getElementById("preferencesArrow");

    preferencesToggle.addEventListener("click", () => {
        const isOpen = preferencesContent.style.display === "block";
        preferencesContent.style.display = isOpen ? "none" : "block";
        preferencesArrow.classList.toggle("rotate", !isOpen);

        if (!isOpen) {
            document.getElementById("interests").value = currentUser.interests || "";
            document.getElementById("budget").value = currentUser.budget || "";
            document.getElementById("preferredSeason").value = currentUser.preferredSeason || "Spring";
            document.getElementById("prefMessage").textContent = "";
        }
    });

    // Preferences Form submit
    document.getElementById("preferencesForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const payload = {
            interests: document.getElementById("interests").value.trim(),
            budget: parseFloat(document.getElementById("budget").value) || 0,
            preferredSeason: document.getElementById("preferredSeason").value,
        };
        fetch(`/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        })
            .then(res => {
                if (!res.ok) throw new Error();
                return res.text();
            })
            .then(msg => {
                document.getElementById("prefMessage").style.color = "green";
                document.getElementById("prefMessage").textContent = msg || "Preferences updated!";
                currentUser = { ...currentUser, ...payload };
            })
            .catch(() => {
                document.getElementById("prefMessage").style.color = "red";
                document.getElementById("prefMessage").textContent = "Failed to update preferences.";
            });
    });
};
