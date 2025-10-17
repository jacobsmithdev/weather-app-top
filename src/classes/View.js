import createWeatherCard from '../modules/createWeatherCard';

export default class View {
    constructor() {
        this.locationForm = document.querySelector('#location-search-form');
        this.locationInput = document.querySelector('#location-search');
        this.dataDiv = document.querySelector('#weather-data');
        this.locationStatusBox = document.querySelector(
            '#location-search-status'
        );
        this.tempUnitBtns = document.querySelector('#temp-setting');
    }

    displayAsLoading() {
        this.locationStatusBox.textContent = 'Searching...';
    }

    updateDisplay(weatherData, tempUnit) {
        this.updateTempBtns(tempUnit);
        this.updateWeatherCard(weatherData, tempUnit);
        this.updateStatusBox(weatherData);
    }

    updateTempBtns(tempUnit) {
        const btns = Array.from(this.tempUnitBtns.children);
        btns.forEach((btn) => {
            if (btn.dataset.tempUnit === tempUnit) {
                btn.classList.add('temp-setting__btn--selected');
            } else {
                btn.classList.remove('temp-setting__btn--selected');
            }
        });
    }

    updateWeatherCard(weatherData, tempUnit) {
        if (!weatherData) return;
        this.dataDiv.textContent = '';
        const weatherCard = createWeatherCard(weatherData, tempUnit);
        this.dataDiv.append(weatherCard);
    }

    updateStatusBox(weatherData) {
        if (!weatherData) {
            this.locationStatusBox.textContent =
                'Could not find data for that location.';
            this.dataDiv.textContent = '';
            return;
        }

        this.locationStatusBox.textContent = 'Data found!';
    }
}
