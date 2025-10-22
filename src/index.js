import './reset.css';
import './fonts.css';
import './styles.css';

import Model from './classes/Model';
import View from './classes/View';

const model = new Model(null, 'F');
const view = new View(model.tempUnit);

view.locationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const location = view.locationInput.value;

    view.displayAsLoading();
    await model.setWeatherLocation(location);
    view.updateDisplay(model.weatherData, model.tempUnit);
});

view.tempUnitBtns.addEventListener('click', (e) => {
    const targetIsBtn = e.target.classList.contains('temp-setting__btn');
    if (!targetIsBtn) return;

    const btn = e.target;
    model.tempUnit = btn.dataset.tempUnit;
    view.updateDisplay(model.weatherData, model.tempUnit);
});

view.minimizeBtn.addEventListener('click', () => {
    view.weatherApp.classList.toggle('weather-app--hidden');
});
