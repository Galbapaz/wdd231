// resources.js — Resources page logic
// ES Module

import { setupNav } from './nav.js';

// ── NAV & FOOTER ────────────────────────────────────────────────
setupNav();

document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent =
    `Last Modified: ${document.lastModified}`;

// ── HIDDEN TIMESTAMP ─────────────────────────────────────────────
const timestampField = document.querySelector('#timestamp');
if (timestampField) {
    timestampField.value = new Date().toLocaleString();
}