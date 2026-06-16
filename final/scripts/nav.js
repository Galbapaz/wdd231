// nav.js — shared navigation module
// imported by all pages

export function setupNav() {
    const menuButton = document.querySelector('#menu');
    const navigation = document.querySelector('.navigation');

    if (menuButton && navigation) {
        menuButton.addEventListener('click', () => {
            navigation.classList.toggle('open');
            menuButton.classList.toggle('open');
        });
    }
}