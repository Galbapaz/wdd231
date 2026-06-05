
const timestampField = document.querySelector('#timestamp');
if (timestampField) {
    timestampField.value = new Date().toLocaleString();
}


const modalButtons = document.querySelectorAll('.info-link');

modalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.querySelector(`#${modalId}`);
        if (modal) {
            modal.showModal();
        }
    });
});


const closeButtons = document.querySelectorAll('.close-modal');

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('dialog');
        if (modal) {
            modal.close();
        }
    });
});


document.querySelectorAll('dialog').forEach(modal => {
    modal.addEventListener('click', (e) => {
        const rect = modal.getBoundingClientRect();
        const clickedOutside =
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom;

        if (clickedOutside) {
            modal.close();
        }
    });
});