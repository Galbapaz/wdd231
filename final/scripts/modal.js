// modal.js — shared modal module
// imported by main.js and vocabulary.js

export function openModal(word) {
    const modal = document.querySelector('#word-modal');
    if (!modal) return;

    document.querySelector('#modal-word').textContent = word.word;
    document.querySelector('#modal-pronunciation').textContent =
        `🔊 ${word.pronunciation}`;
    document.querySelector('#modal-definition').textContent = word.definition;
    document.querySelector('#dialog-example').textContent = `"${word.example}"`;

    const tagsContainer = document.querySelector('#dialog-tags');
    tagsContainer.innerHTML = `
        <span class="tag tag-${word.difficulty}">${word.difficulty}</span>
        <span class="tag tag-category">${word.category}</span>
    `;

    modal.showModal();
}

export function closeModal() {
    const modal = document.querySelector('#word-modal');
    if (!modal) return;

    // Close button
    const closeBtn = document.querySelector('.dialog-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.close();
        });
    }

    // Close when clicking outside (backdrop)
    modal.addEventListener('click', (e) => {
        const rect = modal.getBoundingClientRect();
        const clickedOutside =
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom;
        if (clickedOutside) modal.close();
    });
}