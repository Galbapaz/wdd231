const currentYear = document.querySelector("#currentyear");

const today = new Date();

currentYear.textContent = today.getFullYear();

document.querySelector("#lastModified").textContent =
`Last Modification: ${document.lastModified}`;