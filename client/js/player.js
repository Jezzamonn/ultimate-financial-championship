import { drawSprite } from "./sprites";
import { SCALE } from "./constants";
import { Entity } from "./entity";

export class Player extends Entity {

    constructor() {
        super();

        this.state = null; // player state thing

        this.width = SCALE * 8;
        this.height = SCALE * 8;

        this.animCount = 0;
        this.animPeriod = 1;
    }

    update(dt) {
        this.animCount += dt / this.animPeriod;
        this.animCount %= 1;
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    render(context) {
        const frame = this.animCount < 0.5 ? 0 : 1;
        drawSprite(context, "char", frame, this.midX, this.maxY, SCALE * 8, SCALE * 8);
    }
}
