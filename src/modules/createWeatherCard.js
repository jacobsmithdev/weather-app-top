export default function createWeatherCard(weatherData, tempUnit) {
    const content = document.createElement('div');
    content.classList.add('weather-card');

    const location = document.createElement('div');
    location.textContent = weatherData.location;

    const conditions = document.createElement('div');
    conditions.textContent = weatherData.conditions;

    const datetime = document.createElement('div');
    datetime.textContent = weatherData.datetime;

    const humidity = document.createElement('div');
    humidity.textContent = `Humidity: ${weatherData.humidity}`;

    // Temperature Data
    const tempFeelsLike = Math.round(weatherData.temp.feelsLike[tempUnit]);
    const tempFeelsLikeDisplay = document.createElement('div');
    tempFeelsLikeDisplay.textContent = `Feels Like: ${tempFeelsLike}`;

    const tempCurrent = Math.round(weatherData.temp.current[tempUnit]);
    const tempCurrentDisplay = document.createElement('div');
    tempCurrentDisplay.textContent = `Current: ${tempCurrent}`;

    const tempMax = Math.round(weatherData.temp.max[tempUnit]);
    const tempMaxDisplay = document.createElement('div');
    tempMaxDisplay.textContent = `HI: ${tempMax}`;

    const tempMin = Math.round(weatherData.temp.min[tempUnit]);
    const tempMinDisplay = document.createElement('div');
    tempMinDisplay.textContent = `LO: ${tempMin}`;

    const tempData = document.createElement('div');
    tempData.append(
        tempFeelsLikeDisplay,
        tempCurrentDisplay,
        tempMaxDisplay,
        tempMinDisplay
    );

    content.append(
        location, 
        conditions, 
        datetime, 
        humidity, 
        tempData
    );
    return content;
}
