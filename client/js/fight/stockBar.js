import {slurp} from "../util";

export class StockBar {

    constructor() {
        this.canvas = document.querySelector('#stock-bar');
        /** @type {!CanvasRenderingContext2D} */
        this.context = this.canvas.getContext('2d');

        this.context.msImageSmoothingEnabled = false;
        this.context.mozImageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;

        this.amt = 0.5;
        this.data = null;

        this.x = -150;
        this.y = -200;
        this.width = 300;
        this.height = 200;
    }

    update(dt) {
        this.amt += dt / 10;
        this.amt %= 1;
    }

    render() {
        this.context.beginPath();
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (!this.data) {
            return;
        }

        this.context.beginPath();
        this.context.strokeStyle = 'white';

        const floatIndex = this.data.getFloatIndex(this.amt);
        const indices = [...Array(Math.ceil(floatIndex)).keys(), floatIndex];

        const top = this.data.getUiTop(this.amt);
        const bottom = this.data.getUiBottom(this.amt);
        const diff = Math.max(top - bottom, 0.0001);

        for (let i = 0; i < indices.length; i++) {
            const index = indices[i];
            const value = this.data.getValueAtFloatIndex(index);
            const valueAmt = 1 - ((value - bottom) / diff);

            const xAmt = index / this.data.data.length;
            const x = slurp(0, this.canvas.width, xAmt);
            const y = slurp(0.1, 0.9, valueAmt) * this.canvas.height

            if (i === 0) {
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
