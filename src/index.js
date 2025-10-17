import './reset.css';
import './styles.css';

import Model from './classes/Model';
import createWeatherCard from './modules/createWeatherCard';

const model = new Model(null, 'F');

const locationForm = document.querySelector('#location-search-form');
const locationInput = document.querySelector('#location-search');
const dataDiv = document.querySelector('#weather-data');
const locationStatusBox = document.querySelector('#location-search-status');

const tempUnitBtns = document.querySelector('#temp-setting');

locationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    locationStatusBox.textContent = 'Searching...';

    const location = locationInput.value;
    if (!location) return;

    await model.setWeatherLocation(location);
    if (!model.weatherData) {
        locationStatusBox.textContent =
            'Could not find data for that location.';
        dataDiv.textContent = '';
        return;
    }

    locationStatusBox.textContent = 'Data found!';

    const weatherCard = createWeatherCard(model.weatherData, model.tempUnit);
    dataDiv.textContent = '';
    dataDiv.append(weatherCard);
});

tempUnitBtns.addEventListener('click', (e) => {
    const targetIsBtn = e.target.classList.contains('temp-setting__btn');
    if (!targetIsBtn) return;

    const btn = e.target;
    model.tempUnit = btn.dataset.tempUnit;
});
