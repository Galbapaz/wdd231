// attributions.js — Attributions page logic
// ES Module — imported by attributions.html

import { setupNav } from './nav.js';

// ── NAV & FOOTER ────────────────────────────────────────────────
setupNav();
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent =
    `Last Modified: ${document.lastModified}`;