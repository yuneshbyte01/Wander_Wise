window.onload = () => {
    const token = localStorage.getItem("token");

    // Show/hide navbar links based on login status
    document.getElementById("loginLink").style.display = token ? "none" : "inline";
    document.getElementById("registerLink").style.display = token ? "none" : "inline";
    document.getElementById("recommendLink").style.display = token ? "inline" : "none";
    document.getElementById("logoutLink").style.display = token ? "inline" : "none";

    // Logout button functionality
    const logoutBtn = document.getElementById("logoutLink");
    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        window.location.href = "index.html";
    });

    // Dark Mode toggle
    const darkToggle = document.getElementById("darkToggle");
    const prefersDark = localStorage.getItem("darkMode") === "true";
    if (prefersDark) {
        document.body.classList.add("dark");
    }

    darkToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem("darkMode", document.body.classList.contains("dark"));
    });

    // Fetch and render destinations
    fetch('/destinations')
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('destination-list');
            container.innerHTML = '';

            if (!data || data.length === 0) {
                container.innerHTML = "<p>No destinations available.</p>";
                return;
            }

            data.forEach(dest => {
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
            <a href="destination-details.html?id=${dest.id}" class="btn-more">Explore</a>
          </div>
        `;

                container.appendChild(card);
            });
        })
        .catch(err => {
            document.getElementById('destination-list').textContent = '⚠️ Failed to load destinations.';
            console.error('Error fetching destinations:', err);
        });
};
