export default class ColorGradient {
    constructor(startColorRGB, endColorRGB) {
        this.startColorRGB = startColorRGB;
        this.endColorRGB = endColorRGB;
    }

    getColorAt(percentage) {
        if (percentage < 0) percentage = 0;
        if (percentage > 1) percentage = 1;

        const start = this.#getRGBTriplet(this.startColorRGB);
        const end = this.#getRGBTriplet(this.endColorRGB);

        // Find color values that are N% of the way from the start to end points
        const red = this.#getValueBetween(start.red, end.red, percentage);
        const green = this.#getValueBetween(start.green, end.green, percentage);
        const blue = this.#getValueBetween(start.blue, end.blue, percentage);

        // Convert values to hexadecimal
        const redHex = Math.round(red).toString(16).padStart(2, '0');
        const greenHex = Math.round(green).toString(16).padStart(2, '0');
        const blueHex = Math.round(blue).toString(16).padStart(2, '0');

        return `#${redHex}${greenHex}${blueHex}`;
    }

    #getRGBTriplet(colorRGB) {
        // Trim '#' if present
        if (colorRGB.startsWith('#')) {
            colorRGB = colorRGB.slice(1);
        }

        // Get hexadecimal values for each color
        const redHex = colorRGB.slice(0, 2);
        const greenHex = colorRGB.slice(2, 4);
        const blueHex = colorRGB.slice(4, 6);

        // Convert values to decimal
        const red = this.#hexadecimalToDecimal(redHex);
        const green = this.#hexadecimalToDecimal(greenHex);
        const blue = this.#hexadecimalToDecimal(blueHex);

        return {
            red,
            green,
            blue,
        };
    }

    #hexadecimalToDecimal(num) {
        if (!num.startsWith('0x')) num = `0x${num}`;
        return Number(num);
    }

    #getValueBetween(start, end, percentage) {
        // Get value that is N % (e.g. 20%, 38%, etc) of the way from
        // start to end.

        // NOTE: This formula gets the value N% of the way from
        // the start to end. Swapping start/end values changes
        // output. For example:

        // #getValueBetween(0, 100, 0.2) = 20
        // Start value LESS than the end value means 'moving' forwards:
        // start     20%                                    end
        //   |--------|-------------------------------------|
        //   0       20                                    100

        // #getValueBetween(100, 0, 0.2) = 80
        // Start value GREATER than end value means 'moving' backwards:
        //  end                                   20%     start
        //   |-------------------------------------|--------|
        //   0                                    80       100

        return start + (end - start) * percentage;
    }
}
