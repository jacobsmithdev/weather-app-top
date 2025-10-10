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

    const tempMin = Math.round(weatherData.temp.min[tempUnit]);
    const tempMinDisplay = document.createElement('div');
    tempMinDisplay.classList.add('temp-range__temp');
    tempMinDisplay.textContent = `LO: ${tempMin}`;

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
