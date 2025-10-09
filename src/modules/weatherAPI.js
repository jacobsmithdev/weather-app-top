const API_KEY = 'F57JJ3DEGMWSPCTFJAWNTRPCM';
const urlBase =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

// Specify what unit types API should return data in
const unitGroup = 'us';

async function fetchWeatherData(location) {
    if (!location) throw new Error('Location cannot be empty!');

    const url = `${urlBase}${location}?key=${API_KEY}&unitGroup=${unitGroup}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.status);
    }

    const data = await response.json();

    return data;
}

function processWeatherData(data) {
    const currentConditions = data.currentConditions;
    const today = data.days[0];

    const address = data.resolvedAddress;
    const conditions = currentConditions.conditions;
    const datetime = currentConditions.datetime;
    const humidity = currentConditions.humidity;

    const tempCurrent = currentConditions.temp;
    const tempFeelsLike = currentConditions.feelslike;
    const tempMax = today.tempmax;
    const tempMin = today.tempmin;

    const processedData = {
        address,
        conditions,
        datetime,
        humidity,
        temp: {
            feelsLike: tempFeelsLike,
            current: tempCurrent,
            max: tempMax,
            min: tempMin,
        },
    };

    return processedData;
}

async function getWeatherData(location) {
    try {
        const data = await fetchWeatherData(location);
        const processedData = processWeatherData(data);
        return processedData;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default { getWeatherData };
export { getWeatherData };
