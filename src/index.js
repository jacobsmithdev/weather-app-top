import './styles.css';

import { getWeatherData } from './modules/weatherAPI';
import createWeatherCard from './modules/createWeatherCard';

const locationForm = document.querySelector('#location-search-form');
const locationInput = document.querySelector('#location-search');
const dataDiv = document.querySelector('#weather-data');
const locationErrorBox = document.querySelector('#location-search-error');

locationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    locationErrorBox.textContent = '';

    const location = locationInput.value;
    if (!location) return;

    const data = await getWeatherData(location);
    if (!data) {
        locationErrorBox.textContent = 'Could not find data for that location.';
        dataDiv.textContent = '';
        return;
    }

    const weatherCard = createWeatherCard(data);
    dataDiv.textContent = '';
    dataDiv.append(weatherCard);
});
