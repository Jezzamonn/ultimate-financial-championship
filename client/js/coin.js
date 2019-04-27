import { drawSprite } from "./sprites";
import { SCALE } from "./constants";
import { Entity } from "./entity";

export class Coin extends Entity {

    constructor() {
        super();

        this.width = SCALE * 8;
        this.height = SCALE * 8;
    }

    update(dt) {
        // Nothing??
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    render(context) {
        const spriteWidth = SCALE * 8;
        const spriteHeight = SCALE * 8;
        drawSprite(context, "coin", 0, this.midX - spriteWidth / 2, this.midY - spriteHeight / 2, spriteWidth, spriteHeight);
    }
}
