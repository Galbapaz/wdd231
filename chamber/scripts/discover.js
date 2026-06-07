import { places } from '../data/places.mjs';

// ── VISITOR MESSAGE (localStorage) ──────────────────────────────
const visitorMessage = document.querySelector('#visitor-message');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (!lastVisit) {
    visitorMessage.textContent = 'Welcome! Let us know if you have any questions.';
} else {
    const daysSince = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
    if (daysSince < 1) {
        visitorMessage.textContent = 'Back so soon! Awesome!';
    } else if (daysSince === 1) {
        visitorMessage.textContent = 'You last visited 1 day ago.';
    } else {
        visitorMessage.textContent = `You last visited ${daysSince} days ago.`;
    }
}

localStorage.setItem('lastVisit', now);

// ── BUILD CARDS ──────────────────────────────────────────────────
const grid = document.querySelector('#discover-grid');

places.forEach((place, index) => {
    const card = document.createElement('div');
    card.classList.add('place-card');
    card.setAttribute('data-area', `place${index + 1}`);

    card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
            <img
                src="images/${place.image}"
                alt="${place.name}"
                loading="lazy"
                width="300"
                height="200">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button type="button">Learn More</button>
    `;

    grid.appendChild(card);
});