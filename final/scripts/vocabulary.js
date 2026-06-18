// vocabulary.js — Vocabulary page logic
// ES Module — imported by vocabulary.html

import { setupNav } from './nav.js';
import { openModal, closeModal } from './modal.js';

// ── NAV & FOOTER ────────────────────────────────────────────────
setupNav();
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent =
    `Last Modified: ${document.lastModified}`;

// ── STATE ────────────────────────────────────────────────────────
let allWords = [];
let currentWord = null;
let showingFavorites = false;

// ── FETCH WORDS ──────────────────────────────────────────────────
async function getWords() {
    try {
        const response = await fetch('data/words.json');
        if (!response.ok) throw new Error('Could not load vocabulary data.');
        allWords = await response.json();
        renderWords(allWords);
        updateCount(allWords.length);
    } catch (error) {
        console.error('Fetch error:', error);
        document.querySelector('#vocab-container').innerHTML =
            `<p style="color:red;">Sorry, could not load vocabulary. Please try again later.</p>`;
    }
}

// ── RENDER WORDS ─────────────────────────────────────────────────
function renderWords(words) {
    const container = document.querySelector('#vocab-container');
    const noResults = document.querySelector('#no-results');
    container.innerHTML = '';

    if (words.length === 0) {
        noResults.classList.remove('hidden');
        return;
    }

    noResults.classList.add('hidden');

    // Array method: forEach to build each card
    words.forEach(word => {
        const favorites = getFavorites();
        const isFavorite = favorites.includes(word.word);

        // Template literal for card HTML
        const card = document.createElement('article');
        card.classList.add('word-card');
        card.innerHTML = `
            <div class="card-top">
                <p class="word">${word.word}</p>
                <button
                    class="btn-favorite"
                    aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}"
                    data-word="${word.word}">
                    ${isFavorite ? '⭐' : '☆'}
                </button>
            </div>
            <p class="definition">${word.definition}</p>
            <p class="example">"${word.example}"</p>
            <div class="tags">
                <span class="tag tag-${word.difficulty}">${word.difficulty}</span>
                <span class="tag tag-category">${word.category}</span>
            </div>
        `;

        // Click card to open modal
        card.addEventListener('click', (e) => {
            if (e.target.closest('.btn-favorite')) return;
            currentWord = word;
            openModal(word);
            updateModalFavoriteBtn(word.word);
        });

        // Favorite button inside card
        card.querySelector('.btn-favorite').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(word.word);
            renderWords(getCurrentList());
        });

        container.appendChild(card);
    });
}

// ── FILTERING ────────────────────────────────────────────────────
function getFilteredWords() {
    const search = document.querySelector('#search-input').value.toLowerCase();
    const difficulty = document.querySelector('#difficulty-filter').value;
    const category = document.querySelector('#category-filter').value;

    // Array method: filter
    return allWords.filter(word => {
        const matchesSearch =
            word.word.toLowerCase().includes(search) ||
            word.definition.toLowerCase().includes(search);
        const matchesDifficulty =
            difficulty === 'all' || word.difficulty === difficulty;
        const matchesCategory =
            category === 'all' || word.category === category;
        return matchesSearch && matchesDifficulty && matchesCategory;
    });
}

function getCurrentList() {
    if (showingFavorites) {
        const favorites = getFavorites();
        // Array method: filter
        return allWords.filter(word => favorites.includes(word.word));
    }
    return getFilteredWords();
}

function updateCount(count) {
    const counter = document.querySelector('#results-count');
    if (counter) {
        counter.textContent = `${count} word${count !== 1 ? 's' : ''} found`;
    }
}

// ── LOCAL STORAGE — FAVORITES ────────────────────────────────────
function getFavorites() {
    return JSON.parse(localStorage.getItem('englishSparkFavorites') || '[]');
}

function saveFavorites(favorites) {
    localStorage.setItem('englishSparkFavorites', JSON.stringify(favorites));
}

function toggleFavorite(wordName) {
    const favorites = getFavorites();
    const index = favorites.indexOf(wordName);
    if (index === -1) {
        favorites.push(wordName);
    } else {
        favorites.splice(index, 1);
    }
    saveFavorites(favorites);
}

function updateModalFavoriteBtn(wordName) {
    const btn = document.querySelector('#modal-favorite-btn');
    if (!btn) return;
    const favorites = getFavorites();
    const isFavorite = favorites.includes(wordName);
    btn.textContent = isFavorite ? '⭐ Saved!' : '⭐ Save to Favorites';
    btn.style.backgroundColor = isFavorite ? '#2e7d32' : '';
}

// ── EVENT LISTENERS ──────────────────────────────────────────────

// Search input
document.querySelector('#search-input').addEventListener('input', () => {
    showingFavorites = false;
    const filtered = getFilteredWords();
    renderWords(filtered);
    updateCount(filtered.length);
});

// Difficulty filter
document.querySelector('#difficulty-filter').addEventListener('change', () => {
    showingFavorites = false;
    const filtered = getFilteredWords();
    renderWords(filtered);
    updateCount(filtered.length);
});

// Category filter
document.querySelector('#category-filter').addEventListener('change', () => {
    showingFavorites = false;
    const filtered = getFilteredWords();
    renderWords(filtered);
    updateCount(filtered.length);
});

// Clear filters
document.querySelector('#clear-filters').addEventListener('click', () => {
    document.querySelector('#search-input').value = '';
    document.querySelector('#difficulty-filter').value = 'all';
    document.querySelector('#category-filter').value = 'all';
    showingFavorites = false;
    renderWords(allWords);
    updateCount(allWords.length);
});

// Show favorites
document.querySelector('#show-favorites').addEventListener('click', () => {
    showingFavorites = !showingFavorites;
    const btn = document.querySelector('#show-favorites');

    if (showingFavorites) {
        const favorites = getFavorites();
        // Array method: filter
        const favoriteWords = allWords.filter(w => favorites.includes(w.word));
        renderWords(favoriteWords);
        updateCount(favoriteWords.length);
        btn.textContent = '📋 Show All Words';
    } else {
        renderWords(allWords);
        updateCount(allWords.length);
        btn.textContent = '⭐ Show Favorites';
    }
});

// Clear all favorites
document.querySelector('#clear-favorites').addEventListener('click', () => {
    localStorage.removeItem('englishSparkFavorites');
    showingFavorites = false;
    document.querySelector('#show-favorites').textContent = '⭐ Show Favorites';
    renderWords(allWords);
    updateCount(allWords.length);
});

// Modal favorite button
document.querySelector('#modal-favorite-btn').addEventListener('click', () => {
    if (!currentWord) return;
    toggleFavorite(currentWord.word);
    updateModalFavoriteBtn(currentWord.word);
    renderWords(getCurrentList());
});

// ── INIT ─────────────────────────────────────────────────────────
getWords();
closeModal();