import MultiColorGradient from '../classes/MultiColorGradient';
import Temp from '../classes/Temp';

// Based on:
// https://www.esri.com/arcgis-blog/products/arcgis-pro/mapping/a-meaningful-temperature-palette
const heatMap = new MultiColorGradient([
    { position: 0.0, color: '#ffffff' },
    { position: 0.3, color: '#5961acff' },
    { position: 0.5, color: '#44a0c4ff' },
    { position: 0.7, color: '#eff16bff' },
    { position: 0.8, color: '#f3a238ff' },
    { position: 0.9, color: '#e63149ff' },
    { position: 1.0, color: '#913d3dff' },
]);

const heatMapMin = new Temp(-60, 'F');
const heatMapMax = new Temp(120, 'F');

export default function createWeatherCard(weatherData, tempUnit) {
    const content = document.createElement('div');
    content.classList.add('weather-card');

    const location = document.createElement('div');
    location.classList.add('weather-card__location');
    location.textContent = weatherData.location;

    const conditions = document.createElement('div');
    conditions.classList.add('weather-card__conditions');
    conditions.textContent = weatherData.conditions;

    const datetime = document.createElement('div');
    datetime.textContent = weatherData.datetime;

    const humidity = document.createElement('div');
    humidity.textContent = `Humidity: ${weatherData.humidity}`;

    // Temperature Data
    const tempFeelsLike = Math.round(weatherData.temp.feelsLike[tempUnit]);
    const tempFeelsLikeDisplay = document.createElement('div');
    tempFeelsLikeDisplay.classList.add('weather-card__temp-feels-like');
    tempFeelsLikeDisplay.textContent = `Feels Like: ${tempFeelsLike}`;

    const tempCurrent = Math.round(weatherData.temp.current[tempUnit]);
    const tempCurrentDisplay = document.createElement('div');
    tempCurrentDisplay.classList.add('weather-card__temp-current');
    tempCurrentDisplay.textContent = `${tempCurrent}°`;

    const tempMax = Math.round(weatherData.temp.max[tempUnit]);
    const tempMaxDisplay = document.createElement('div');
    tempMaxDisplay.classList.add('temp-range__temp');
    tempMaxDisplay.textContent = `HI: ${tempMax}`;
    tempMaxDisplay.style.backgroundColor = getTempColor(weatherData.temp.max);

    const tempMin = Math.round(weatherData.temp.min[tempUnit]);
    const tempMinDisplay = document.createElement('div');
    tempMinDisplay.classList.add('temp-range__temp');
    tempMinDisplay.textContent = `LO: ${tempMin}`;
    tempMinDisplay.style.backgroundColor = getTempColor(weatherData.temp.min);

    const tempRange = document.createElement('div');
    tempRange.classList.add('temp-range');
    tempRange.append(tempMinDisplay, tempMaxDisplay);

    content.append(
        location,
        datetime,
        conditions,
        tempCurrentDisplay,
        tempFeelsLikeDisplay,
        tempRange,
        humidity
    );
    return content;
}

function getTempColor(temp) {
    const range = heatMapMax.F - heatMapMin.F;
    const tempPlacement = (temp.F - heatMapMin.F) / range;

    return heatMap.getColorAt(tempPlacement);
}
