window.onload = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const toggleVisibility = (id, show) => {
        const el = document.getElementById(id);
        if (el) el.style.display = show ? "inline" : "none";
    };

    // Show/hide nav links based on login status
    toggleVisibility("recommendLink", !!token);
    toggleVisibility("profileMenu", !!token);
    toggleVisibility("loginLink", !token);
    toggleVisibility("registerLink", !token);
    toggleVisibility("heroRecommend", !!token);
    toggleVisibility("heroLogin", !token);
    toggleVisibility("heroRegister", !token);

    // Dark mode preference
    const darkToggle = document.getElementById("darkToggle");
    const prefersDark = localStorage.getItem("darkMode") === "true";
    if (prefersDark) document.body.classList.add("dark");

    darkToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem("darkMode", document.body.classList.contains("dark"));
    });

    // Load featured destinations
    fetch('/destinations')
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("featured-list");
            container.innerHTML = "";

            data.slice(0, 3).forEach(dest => {
                const card = document.createElement('div');
                card.classList.add('destination-card');

                const imageUrl = dest.imageUrl || 'https://source.unsplash.com/400x300/?nepal,travel';

                card.innerHTML = `
                    <img src="${imageUrl}" alt="${dest.name}" />
                    <div class="content">
                        <h2>${dest.name}</h2>
                        <p>${dest.description || "No description available."}</p>
                        <p><strong>Tags:</strong> ${Array.isArray(dest.tags) ? dest.tags.join(", ") : dest.tags || "None"}</p>
                        <p><strong>Cost:</strong> NPR ${dest.averageCost}</p>
                        <p><strong>Best Season:</strong> ${dest.bestSeason}</p>
                    </div>
                `;
                container.appendChild(card);
            });
        })
        .catch(err => {
            console.error("Error loading featured destinations:", err);
            const container = document.getElementById("featured-list");
            if(container) container.textContent = "⚠️ Error loading destinations.";
        });

    // Profile dropdown toggle
    const profileIcon = document.getElementById("profileIcon");
    const profileDropdown = document.getElementById("profileDropdown");

    if (profileIcon && profileDropdown) {
        profileIcon.addEventListener("click", () => {
            const isOpen = profileDropdown.style.display === "block";
            profileDropdown.style.display = isOpen ? "none" : "block";
        });

        // Close dropdown when clicking outside
        window.addEventListener("click", (e) => {
            if (!profileIcon.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.style.display = "none";
            }
        });
    }

    // Logout handler inside dropdown
    const logoutBtn = document.getElementById("logoutLink");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            window.location.href = "index.html";
        });
    }

    // Optionally, fetch a username and show it next to the profile-icon
    if(token && userId && profileIcon){
        fetch(`/users/${userId}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(user => {
                if(user.name){
                    profileIcon.textContent = `👤 ${user.name.split(" ")[0]} ▼`;
                }
            })
            .catch(() => {
                // fallback icon if fetch fails
                profileIcon.textContent = '👤 ▼';
            });
    }
};
