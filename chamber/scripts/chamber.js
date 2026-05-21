

const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();


const lastModified = document.querySelector("#lastModified");

lastModified.textContent =
    `Last Modification: ${document.lastModified}`;


const menuButton = document.querySelector("#menu");

const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

    menuButton.classList.toggle("open");

});

const url = "data/members.json";

const cards = document.querySelector("#members-container");



async function getMembers() {

    const response = await fetch(url);

    const data = await response.json();

    displayMembers(data);

}



const displayMembers = (members) => {

    members.forEach((member) => {

        const card = document.createElement("section");

        card.classList.add("member-card");

        card.innerHTML = `

            <img src="images/${member.image}"
              alt="Logo of ${member.name}"
              loading="lazy"
              width="300"
              height="200">
              
            <h3>${member.name}</h3>

            <p>${member.industry}</p>

            <p><strong>PHONE:</strong> ${member.phone}</p>

            <p><strong>ADDRESS:</strong> ${member.address}</p>

            <p>
                <strong>URL:</strong>
                <a href="${member.website}"
                   target="_blank">
                   ${member.website}
                </a>
            </p>

            <p>
                <strong>Membership:</strong>
                ${member.membership}
            </p>
        `;

        cards.appendChild(card);

    });

};



getMembers();



const gridButton = document.querySelector("#grid");

const listButton = document.querySelector("#list");



gridButton.addEventListener("click", () => {

    cards.classList.add("grid");

    cards.classList.remove("list");

});



listButton.addEventListener("click", () => {

    cards.classList.add("list");

    cards.classList.remove("grid");

});