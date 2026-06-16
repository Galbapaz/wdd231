// thankyou.js — Thank You page logic
// ES Module — imported by thankyou.html

import { setupNav } from './nav.js';

// ── NAV & FOOTER ────────────────────────────────────────────────
setupNav();
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent =
    `Last Modified: ${document.lastModified}`;

// ── READ URL PARAMS ──────────────────────────────────────────────
const params = new URLSearchParams(window.location.search);

// Map param keys to friendly display labels
const fieldLabels = {
    name:       'Name',
    email:      'Email',
    level:      'English Level',
    suggestion: 'Word or Topic',
    comments:   'Comments',
    timestamp:  'Submitted At',
};

const summary = document.querySelector('#summary');

let hasParams = false;

for (const [key, label] of Object.entries(fieldLabels)) {
    const value = params.get(key);
    if (value && value.trim() !== '') {
        hasParams = true;

        const dt = document.createElement('dt');
        dt.style.cssText = `
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #1a3c5e;
        `;
        dt.textContent = label;

        const dd = document.createElement('dd');
        dd.style.cssText = `
            margin: 0 0 0.4rem 0;
            color: #333;
            font-size: 0.95rem;
            padding-bottom: 0.6rem;
            border-bottom: 1px solid #eee;
        `;
        dd.textContent = value;

        summary.appendChild(dt);
        summary.appendChild(dd);
    }
}

// Fallback if no params found
if (!hasParams) {
    summary.innerHTML = `
        <p style="color: #888; font-style: italic; font-size: 0.9rem;">
            No submission details found. Please fill out the form on the
            <a href="resources.html" style="color: #1a3c5e;">Resources page</a>.
        </p>
    `;
}