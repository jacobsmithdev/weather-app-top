import Temp from '../classes/Temp';

const API_KEY = 'F57JJ3DEGMWSPCTFJAWNTRPCM';
const urlBase =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

// Specify what unit types API should return data in
const unitGroup = 'us';
const tempUnit = getTempUnit(unitGroup);

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

    const location = data.resolvedAddress;
    const conditions = currentConditions.conditions;
    const datetime = currentConditions.datetime;
    const humidity = currentConditions.humidity;

    const tempCurrent = new Temp(currentConditions.temp, tempUnit);
    const tempFeelsLike = new Temp(currentConditions.feelslike, tempUnit);
    const tempMax = new Temp(today.tempmax, tempUnit);
    const tempMin = new Temp(today.tempmin, tempUnit);

    const processedData = {
        location,
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

function getTempUnit(unitGroup) {
    if (unitGroup === 'base') return 'K';
    if (unitGroup === 'us') return 'F';
    if (unitGroup === 'metric' || unitGroup === 'uk') return 'C';
}

export default { getWeatherData };
export { getWeatherData };
