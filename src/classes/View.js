import createWeatherCard from '../modules/createWeatherCard';

export default class View {
    constructor(initialTempUnit = 'F') {
        this.weatherApp = document.querySelector('.weather-app');
        this.locationForm = document.querySelector('#location-search-form');
        this.locationInput = document.querySelector('#location-search');
        this.weatherDataDisplay = document.querySelector('#weather-data');
        this.locationStatusBox = document.querySelector(
            '#location-search-status'
        );
        this.minimizeBtn = document.querySelector('#weather-app__minimize');
        this.expandBtn = document.querySelector('#weather-app__expand');
        this.tempUnitBtns = document.querySelector('#temp-setting');

        this.#updateTempBtns(initialTempUnit);
    }

    displayAsLoading() {
        this.locationStatusBox.textContent = 'Searching...';
    }

    updateDisplay(weatherData, tempUnit) {
        this.#updateTempBtns(tempUnit);
        this.#updateWeatherCard(weatherData, tempUnit);
        this.#updateStatusBox(weatherData);
    }

    #updateTempBtns(tempUnit) {
        const btns = Array.from(this.tempUnitBtns.children);
        btns.forEach((btn) => {
            if (btn.dataset.tempUnit === tempUnit) {
                btn.classList.add('button--selected');
            } else {
                btn.classList.remove('button--selected');
            }
        });
    }

    #updateWeatherCard(weatherData, tempUnit) {
        this.weatherDataDisplay.textContent = '';
        if (!weatherData) return;
        const weatherCard = createWeatherCard(weatherData, tempUnit);
        this.weatherDataDisplay.append(weatherCard);
    }

    #updateStatusBox(weatherData) {
        if (!weatherData) {
            this.locationStatusBox.textContent =
                'Could not find data for that location.';
            return;
        }

        this.locationStatusBox.textContent = 'Data found!';
    }
}
