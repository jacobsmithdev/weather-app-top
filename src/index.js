import './reset.css';
import './styles.css';

import { getWeatherData } from './modules/weatherAPI';
import createWeatherCard from './modules/createWeatherCard';

const locationForm = document.querySelector('#location-search-form');
const locationInput = document.querySelector('#location-search');
const dataDiv = document.querySelector('#weather-data');
const locationStatusBox = document.querySelector('#location-search-status');

let tempUnit = 'F';

const tempUnitBtns = document.querySelector('#temp-setting');

locationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    locationStatusBox.textContent = '';

    const location = locationInput.value;
    if (!location) return;

    const data = await getWeatherData(location);
    if (!data) {
        locationStatusBox.textContent =
            'Could not find data for that location.';
        dataDiv.textContent = '';
        return;
    }

    const weatherCard = createWeatherCard(data, tempUnit);
    dataDiv.textContent = '';
    dataDiv.append(weatherCard);
});

tempUnitBtns.addEventListener('click', (e) => {
    const targetIsBtn = e.target.classList.contains('temp-setting__btn');
    if (!targetIsBtn) return;

    const btn = e.target;
    tempUnit = btn.dataset.tempUnit;
});
