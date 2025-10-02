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
    const tempFeelsLike = document.createElement('div');
    tempFeelsLike.textContent = `Feels Like: ${weatherData.temp.feelsLike}`;

    const tempCurrent = document.createElement('div');
    tempCurrent.textContent = `Current: ${weatherData.temp.current}`;

    const tempMax = document.createElement('div');
    tempMax.textContent = `HI: ${weatherData.temp.max}`;

    const tempMin = document.createElement('div');
    tempMin.textContent = `LO: ${weatherData.temp.min}`;

    const tempData = document.createElement('div');
    tempData.append(tempFeelsLike, tempCurrent, tempMax, tempMin);

    content.append(address, conditions, datetime, humidity, tempData);
    return content;
}
