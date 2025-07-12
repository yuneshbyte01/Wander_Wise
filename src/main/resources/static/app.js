fetch('/destinations')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('destination-list');
        data.forEach(dest => {
            const div = document.createElement('div');
            div.innerHTML = `
        <h3>${dest.name}</h3>
        <p>${dest.description}</p>
        <p><strong>Cost:</strong> ${dest.averageCost} NPR</p>
        <p><strong>Best Season:</strong> ${dest.bestSeason}</p>
        <hr/>
      `;
            container.appendChild(div);
        });
    })
    .catch(err => {
        document.getElementById('destination-list').textContent = 'Failed to load destinations.';
        console.error('Error fetching destinations:', err);
    });
