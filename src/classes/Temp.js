import { convertTemp } from '../modules/convertTemp';

export default class Temp {
    #kelvin;

    constructor(temp, tempUnit) {
        this.setTemp(temp, tempUnit, 'K');
    }

    setTemp(temp, tempUnit) {
        this.#kelvin = convertTemp(temp, tempUnit, 'K');
    }

    getTemp(tempUnit) {
        return this[tempUnit];
    }

    get K() {
        // Return internal Kelvin temperature as Kelvin
        return this.#kelvin;
    }

    set K(val) {
        // Return internal Kelvin temperature as Kelvin
        this.#kelvin = val;
    }

    get C() {
        // Return internal Kelvin temperature as equivalent amount in Celsius
        return convertTemp(this.#kelvin, 'K', 'C');
    }

    set C(val) {
        // Convert input to equivalent units in Kelvin, then set
        // internal Kelvin temperature
        this.#kelvin = convertTemp(val, 'C', 'K');
    }

    get F() {
        // Return internal Kelvin temp as equivalent amount in Fahrenheit
        return convertTemp(this.#kelvin, 'K', 'F');
    }

    set F(val) {
        // Convert input to equivalent units in Kelvin, then set
        // internal Kelvin temperature
        this.#kelvin = convertTemp(val, 'F', 'K');
    }
}
