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
function displayWordOfDay(words) {
    const container = document.querySelector('#word-of-day-container');
    if (!container) return;

    const dayOfYear = Math.floor(
        (Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
    );
    const word = words[dayOfYear % words.length];

    // No inline styles — all classes defined in small.css
    container.innerHTML = `
        <p class="wod-word">${word.word}</p>
        <p class="wod-pronunciation">🔊 ${word.pronunciation}</p>
        <p class="wod-definition">${word.definition}</p>
        <div class="tags">
            <span class="tag tag-${word.difficulty}">${word.difficulty}</span>
            <span class="tag tag-category">${word.category}</span>
        </div>
        <button class="btn-primary wod-btn" id="wod-details-btn">
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