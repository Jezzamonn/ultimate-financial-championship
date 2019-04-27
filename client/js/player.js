import { getImage, drawSprite } from "./sprites";

export class Player {

    constructor() {
        this.pos = {x: 0, y: 0};
        this.state = null; // player state thing
    }

    update(dt) {
        // Nothing??
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    render(context) {
        drawSprite(context, "char", 0, this.pos.x, this.pos.y, 8, 8);
    }
}
