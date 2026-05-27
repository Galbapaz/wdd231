const weatherURL =
    'https://api.openweathermap.org/data/2.5/weather?lat=-17.7833&lon=-63.1821&units=metric&appid=1dcf0b17f6b87c4c6813869c1f86bbe2';

const forecastURL =
    'https://api.openweathermap.org/data/2.5/forecast?lat=-17.7833&lon=-63.1821&units=metric&appid=1dcf0b17f6b87c4c6813869c1f86bbe2';

const membersURL =
    'data/members.json';




async function getWeather() {

    try {

        const response = await fetch(weatherURL);

        const data = await response.json();

        displayWeather(data);

    } catch (error) {

        console.error(error);

    }

}



function displayWeather(data) {

    const weatherContainer =
        document.querySelector('#weather');

    weatherContainer.innerHTML = `
        <p>${Math.round(data.main.temp)}°C</p>
        <p>${data.weather[0].description}</p>
    `;

}



/* FORECAST */

async function getForecast() {

    try {

        const response = await fetch(forecastURL);

        const data = await response.json();

        displayForecast(data);

    } catch (error) {

        console.error(error);

    }

}



function displayForecast(data) {

    const forecastContainer =
        document.querySelector('#forecast');

    const forecastList =
        data.list.filter(item =>
            item.dt_txt.includes('12:00:00'));

    forecastContainer.innerHTML = '';

    forecastList.slice(0, 3).forEach(day => {

        const date =
            new Date(day.dt_txt);

        const card =
            document.createElement('p');

        card.innerHTML = `
            ${date.toLocaleDateString('en-US', { weekday: 'long' })}:
            ${Math.round(day.main.temp)}°C
        `;

        forecastContainer.appendChild(card);

    });

}



/* SPOTLIGHTS */

async function getSpotlights() {

    try {

        const response =
            await fetch(membersURL);

        const data =
            await response.json();

        displaySpotlights(data.members);

    } catch (error) {

        console.error(error);

    }

}



function displaySpotlights(members) {

    const container =
        document.querySelector('#spotlights-container');



    const filtered =
        members.filter(member =>
            member.membership === 'Gold' ||
            member.membership === 'Silver');



    const shuffled =
        filtered.sort(() => 0.5 - Math.random());



    const selected =
        shuffled.slice(0, 3);



    selected.forEach(member => {

        const card =
            document.createElement('article');

        card.classList.add('spotlight-card');



        card.innerHTML = `
            <img src="${member.image}"
                alt="${member.name} logo">

            <h3>${member.name}</h3>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <p>
                <a href="${member.website}"
                    target="_blank">
                    Visit Website
                </a>
            </p>

            <p>
                Membership:
                ${member.membership}
            </p>
        `;

        container.appendChild(card);

    });

}



getWeather();
getForecast();
getSpotlights();