import { drawSprite } from "./sprites";
import { SCALE } from "./constants";
import { Entity } from "./entity";

export class Coin extends Entity {

    constructor() {
        super();
    }

    update(dt) {
        // Nothing??
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    render(context) {
        drawSprite(context, "coin", 0, this.midX, this.midY, SCALE * 8, SCALE * 8);
    }
}
