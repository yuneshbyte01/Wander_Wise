window.onload = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const name = localStorage.getItem("name");

    // 🔒 Auth check
    if (!token || !userId) {
        alert("Please log in to see recommendations.");
        window.location.href = "login.html";
        return;
    }

    // Show logout link
    const logoutBtn = document.getElementById("logoutLink");
    if (logoutBtn) {
        logoutBtn.style.display = "inline";
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.clear();
            window.location.href = "index.html";
        });
    }

    // 🌙 Dark Mode toggle
    const darkToggle = document.getElementById("darkToggle");
    const prefersDark = localStorage.getItem("darkMode") === "true";
    if (prefersDark) {
        document.body.classList.add("dark");
    }

    if (darkToggle) {
        darkToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark");
            localStorage.setItem("darkMode", document.body.classList.contains("dark"));
        });
    }

    // 🙋 Greet user
    const greeting = document.getElementById("greeting");
    if (greeting && name) {
        greeting.textContent = `Hi, ${name}! Here are your recommendations:`;
    }

    // 📥 Fetch recommendations
    fetch(`/recommendations/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            if (res.status === 401 || res.status === 403) {
                alert("Session expired. Please log in again.");
                localStorage.clear();
                window.location.href = "index.html";
                return Promise.reject("Unauthorized");
            }
            return res.json();
        })
        .then(data => {
            const container = document.getElementById("rec-list");
            if (!container) return;

            if (!data || data.length === 0) {
                container.innerHTML = "<p>No matches found based on your preferences.</p>";
                return;
            }

            container.innerHTML = ""; // Clear previous content

            data.forEach(dest => {
                const card = document.createElement("div");
                card.className = "recommendation-card";

                card.innerHTML = `
                <img src="${dest.imageUrl || 'placeholder.jpg'}" alt="${dest.name}">
                <div class="content">
                    <h2>${dest.name}</h2>
                    <p>${dest.description || "No description."}</p>
                    <p><strong>Tags:</strong> ${Array.isArray(dest.tags) ? dest.tags.join(", ") : (dest.tags || "None")}</p>
                    <p><strong>Cost:</strong> ${dest.averageCost} NPR</p>
                    <p><strong>Season:</strong> ${dest.bestSeason || "N/A"}</p>
                </div>
            `;

                container.appendChild(card);
            });
        })
        .catch(err => {
            console.error("Failed to fetch recommendations:", err);
            const container = document.getElementById("rec-list");
            if (container) {
                container.innerHTML = "<p>⚠️ Error loading recommendations.</p>";
            }
        });
};
