import { getWeatherData } from '../modules/weatherAPI';

export default class Model {
    constructor(weatherData, tempUnit = 'F') {
        this.weatherData = weatherData;
        this.tempUnit = tempUnit;
    }

    async setWeatherLocation(location) {
        if (!location) return;

        const weatherData = await getWeatherData(location);
        this.weatherData = weatherData;
    }
}
