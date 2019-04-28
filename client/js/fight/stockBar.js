import {slurp} from "../util";

export default class StockBar {

    constructor() {
        this.canvas = document.querySelector('#stock-bar');
        /** @type {!CanvasRenderingContext2D} */
        this.context = this.canvas.getContext('2d');

        this.context.msImageSmoothingEnabled = false;
        this.context.mozImageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;

        this.amt = 0.99999;
        this.data = [0, 1, 0, 1];

        this.x = -150;
        this.y = -200;
        this.width = 300;
        this.height = 200;
    }

    update(dt) {
        this.amt += 0.1;
        this.amt %= 1;
    }

    render() {
        this.context.beginPath();
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const maxPoints = 100;
        this.context.beginPath();
        this.context.strokeStyle = 'white';
        for (let iAmt = 0; iAmt <= this.amt; iAmt += 1 / maxPoints) {
            const indexAmt = (this.data.length - 1) * iAmt;
            const firstIndex = Math.floor(indexAmt);
            const firstIndexAmt = indexAmt % 1;
            const firstValue = this.data[firstIndex];
            const secondIndex = firstIndex + 1;
            let secondValue = 0;
            if (secondIndex < this.data.length) {
                secondValue = this.data[secondIndex];
            }
            const value = slurp(firstValue, secondValue, 1 - firstIndexAmt)

            const x = slurp(0, this.canvas.width, iAmt);
            const y = slurp(0, this.canvas.height, value);

            if (iAmt === 0) {
                this.context.moveTo(x, y);
            }
            else {
                this.context.lineTo(x, y);
            }
        }
        // draw multiple times to get rid of antialiasing haha
        for (let i = 0; i < 100; i++) {
            this.context.stroke();
        }
    }

}
