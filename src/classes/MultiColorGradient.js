import ColorGradient from './ColorGradient';

export default class MultiColorGradient {
    constructor(colorPoints) {
        this.colorPoints = colorPoints;
    }

    get startColorPoint() {
        if (!this.colorPoints.length) return null;
        return this.colorPoints[0];
    }

    set startColorPoint(point) {
        this.colorPoints[0] = point;
    }

    get endColorPoint() {
        if (!this.colorPoints.length) return null;
        const endIndex = this.colorPoints.length - 1;
        return this.colorPoints[endIndex];
    }

    set endColorPoint(point) {
        if (!this.colorPoints.length) return;
        const endIndex = this.colorPoints.length - 1;
        this.colorPoints[endIndex] = point;
    }

    getColorAt(position) {
        if (position >= 1) return this.endColorPoint.color;
        if (position <= 0) return this.startColorPoint.color;

        for (let i = 0; i < this.colorPoints.length - 1; i++) {
            const currentPoint = this.colorPoints[i];
            const nextPoint = this.colorPoints[i + 1];

            // If current point position is the same as target position, return its color
            if (currentPoint.position === position) return currentPoint.color;

            // Check if position falls between current point and next point
            const positionBetweenPoints =
                position > currentPoint.position &&
                position < nextPoint.position;

            // If position falls between current and next point
            if (positionBetweenPoints) {
                return this.#getColorBetween(currentPoint, nextPoint, position);
            }
        }
    }

    #getColorBetween(startPoint, endPoint, position) {
        // Following the formula from:
        // https://math.stackexchange.com/q/2618431

        // Get the range our position can fall between, e.g.:
        // endPoint (0.8) - startPoint (0.3) = 0.5
        const range = endPoint.position - startPoint.position;

        // Adjust our target position to fall in the range by subtracting the starting value, e.g.:
        // position (0.5) - startPoint(0.3) = 0.2
        const adjustedPosition = position - startPoint.position;

        // Divide the adjusted position by the range to find out what percent it is in that range, e.g.:
        // adjustedPosition (0.2) / range (0.5) = 0.4

        // position (0.5) is 40% of the way between startPoint (0.3) and endPoint (0.8):
        //     0.3           0.5                0.8
        //      o-----40%-----o                  |
        //      |-------------|------------------|
        // startPoint      position           endPoint

        const relativePosition = adjustedPosition / range;

        // Knowing what percentage the position is between our two points means we can create
        // a gradient of those two points and take the color N% (40%) of the between them
        const gradient = new ColorGradient(startPoint.color, endPoint.color);
        return gradient.getColorAt(relativePosition);
    }
}
