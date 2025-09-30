// Convert between Kelvin, Celsius, and Fahrenheit temperature values.
function convertTemp(temp, tempUnit, targetUnit) {
    tempUnit = tempUnit.toUpperCase();
    targetUnit = targetUnit.toUpperCase();

    if (tempUnit === targetUnit) {
        return temp;
    }

    // Kelvin Conversions
    if (tempUnit === 'K' && targetUnit === 'C') {
        return kelvinToCelsius(temp);
    }
    if (tempUnit === 'K' && targetUnit === 'F') {
        return kelvinToFahrenheit(temp);
    }

    // Celsius Conversions
    if (tempUnit === 'C' && targetUnit === 'F') {
        return celsiusToFahrenheit(temp);
    }
    if (tempUnit === 'C' && targetUnit === 'K') {
        return celsiusToKelvin(temp);
    }

    // Fahrenheit Conversions
    if (tempUnit === 'F' && targetUnit === 'C') {
        return fahrenheitToCelsius(temp);
    }
    if (tempUnit === 'F' && targetUnit === 'K') {
        return fahrenheitToKelvin(temp);
    }
}

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

function kelvinToFahrenheit(kelvin) {
    return kelvin * (9 / 5) - 459.67;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * (5 / 9);
}

function fahrenheitToKelvin(fahrenheit) {
    // Equivalent to:
    // (fahrenheit - 32) * (5/9) + 273.15
    return (fahrenheit + 459.67) * (5 / 9);
}

function celsiusToFahrenheit(celsius) {
    return celsius * (9 / 5) + 32;
}

function celsiusToKelvin(celsius) {
    return celsius + 273.15;
}

export default { convertTemp };
export { convertTemp };
