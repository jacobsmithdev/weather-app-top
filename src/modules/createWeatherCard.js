export default function createWeatherCard(weatherData) {
    const content = document.createElement('div');
    content.classList.add('weather-card');

    const address = document.createElement('div');
    address.textContent = weatherData.address;

    const conditions = document.createElement('div');
    conditions.textContent = weatherData.conditions;

    const datetime = document.createElement('div');
    datetime.textContent = weatherData.datetime;

    const humidity = document.createElement('div');
    humidity.textContent = `Humidity: ${weatherData.humidity}`;

    // Temperature Data
    const tempFeelsLike = Math.round(weatherData.temp.feelsLike.F);
    const tempFeelsLikeDisplay = document.createElement('div');
    tempFeelsLikeDisplay.textContent = `Feels Like: ${tempFeelsLike}`;

    const tempCurrent = Math.round(weatherData.temp.current.F);
    const tempCurrentDisplay = document.createElement('div');
    tempCurrentDisplay.textContent = `Current: ${tempCurrent}`;

    const tempMax = Math.round(weatherData.temp.max.F);
    const tempMaxDisplay = document.createElement('div');
    tempMaxDisplay.textContent = `HI: ${tempMax}`;

    const tempMin = Math.round(weatherData.temp.min.F);
    const tempMinDisplay = document.createElement('div');
    tempMinDisplay.textContent = `LO: ${tempMin}`;

    const tempData = document.createElement('div');
    tempData.append(tempFeelsLikeDisplay, tempCurrentDisplay, tempMaxDisplay, tempMinDisplay);

    content.append(address, conditions, datetime, humidity, tempData);
    return content;
}
