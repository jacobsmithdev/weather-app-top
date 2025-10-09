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
    tempFeelsLike.textContent = `Feels Like: ${Math.round(weatherData.temp.feelsLike.F)}`;

    const tempCurrent = document.createElement('div');
    tempCurrent.textContent = `Current: ${Math.round(weatherData.temp.current.F)}`;

    const tempMax = document.createElement('div');
    tempMax.textContent = `HI: ${Math.round(weatherData.temp.max.F)}`;

    const tempMin = document.createElement('div');
    tempMin.textContent = `LO: ${Math.round(weatherData.temp.min.F)}`;

    const tempData = document.createElement('div');
    tempData.append(tempFeelsLike, tempCurrent, tempMax, tempMin);

    content.append(address, conditions, datetime, humidity, tempData);
    return content;
}
