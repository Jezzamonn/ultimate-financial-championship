import { drawAnimation } from "./sprites";
import { SCALE } from "./constants";
import { Entity } from "./entity";

export class Coin extends Entity {

    constructor() {
        super();

        this.width = SCALE * 16;
        this.height = SCALE * 16;

        this.animCount = 40 * Math.random();
    }

    update(dt) {
        this.animCount += dt;
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    render(context) {
        drawAnimation(context, "coin", "Flip", this.animCount, this.midX, this.midY, 0.5, 0.9);
    }
}
