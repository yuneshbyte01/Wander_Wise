fetch('/destinations')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('destination-list');
        container.innerHTML = '';

        data.forEach(dest => {
            const card = document.createElement('div');
            card.classList.add('destination-card');

            // Optional: Use dest.imageUrl or fallback placeholder
            const imageUrl = dest.imageUrl || 'https://source.unsplash.com/400x300/?nepal,travel';

            card.innerHTML = `
        <img src="${imageUrl}" alt="${dest.name}" />
        <div class="content">
          <h2>${dest.name}</h2>
          <p>${dest.description}</p>
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
