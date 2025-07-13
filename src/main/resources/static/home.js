window.onload = () => {
    const token = localStorage.getItem("token");

    const toggleVisibility = (id, show) => {
        const el = document.getElementById(id);
        if (el) el.style.display = show ? "inline" : "none";
    };

    toggleVisibility("recommendLink", !!token);
    toggleVisibility("logoutLink", !!token);
    toggleVisibility("loginLink", !token);
    toggleVisibility("registerLink", !token);
    toggleVisibility("heroRecommend", !!token);
    toggleVisibility("heroLogin", !token);
    toggleVisibility("heroRegister", !token);

    const logoutBtn = document.getElementById("logoutLink");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("token");
            location.href = "index.html";
        });
    }

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
            document.getElementById("featured-list").textContent = "⚠️ Error loading destinations.";
        });
};
