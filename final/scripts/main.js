// ── IMPORTS ─────────────────────────────────────────────────────
import { setupNav } from './nav.js';
import { openModal, closeModal } from './modal.js';

// ── NAV & FOOTER ────────────────────────────────────────────────
setupNav();

document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent =
    `Last Modified: ${document.lastModified}`;

// ── FETCH WORDS ─────────────────────────────────────────────────
async function getWords() {
    try {
        const response = await fetch('data/words.json');
        if (!response.ok) throw new Error('Failed to load words.');
        const words = await response.json();
        displayWordOfDay(words);
        displayFeaturedWords(words);
    } catch (error) {
        console.error('Error loading words:', error);
    }
}

// ── WORD OF THE DAY ─────────────────────────────────────────────
// Uses the day of the year so it changes daily but is consistent
function displayWordOfDay(words) {
    const container = document.querySelector('#word-of-day-container');
    if (!container) return;

    const dayOfYear = Math.floor(
        (Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
    );
    const word = words[dayOfYear % words.length];

    container.innerHTML = `
        <p class="word" style="
            font-family: 'Merriweather', serif;
            font-size: 1.3rem;
            color: #1a3c5e;
            font-weight: 700;
            margin-bottom: 0.4rem;">
            ${word.word}
        </p>
        <p style="font-size: 0.85rem; color: #666; margin-bottom: 0.5rem;">
            🔊 ${word.pronunciation}
        </p>
        <p style="font-size: 0.9rem; color: #444; margin-bottom: 0.8rem;">
            ${word.definition}
        </p>
        <div class="tags">
            <span class="tag tag-${word.difficulty}">${word.difficulty}</span>
            <span class="tag tag-category">${word.category}</span>
        </div>
        <button class="btn-primary mt-1"
            style="margin-top: 1rem; font-size: 0.85rem; padding: 0.5rem 1rem;"
            id="wod-details-btn">
            Full Details
        </button>
    `;

    document.querySelector('#wod-details-btn').addEventListener('click', () => {
        openModal(word);
    });
}

// ── FEATURED WORDS (6 random words) ─────────────────────────────
function displayFeaturedWords(words) {
    const container = document.querySelector('#featured-words');
    if (!container) return;

    // Shuffle and pick 6
    const shuffled = [...words].sort(() => 0.5 - Math.random());
    const featured = shuffled.slice(0, 6);

    container.innerHTML = '';

    featured.forEach(word => {
        const card = document.createElement('article');
        card.classList.add('word-card');
        card.innerHTML = `
            <p class="word">${word.word}</p>
            <p class="definition">${word.definition}</p>
            <p class="example">"${word.example}"</p>
            <div class="tags">
                <span class="tag tag-${word.difficulty}">${word.difficulty}</span>
                <span class="tag tag-category">${word.category}</span>
            </div>
        `;

        card.addEventListener('click', () => {
            openModal(word);
        });

        container.appendChild(card);
    });
}

// ── INIT ─────────────────────────────────────────────────────────
getWords();
closeModal();