import { Player } from "./player";
import { Coin } from "./coin";

export default class World {

	constructor() {
        this.player = new Player();
        this.coins = [];
        for (let i = 0; i < 10; i ++) {
            const coin = new Coin();
            coin.x = 200 * (2 * Math.random() - 1);
            coin.y = 200 * (2 * Math.random() - 1);
            this.coins.push(coin);
        }
		this.cameraPos = {x: 0, y: 0};
	}

	update(dt) {
		this.player.update(dt);

		this.updateCamera();
	}

	onMouseClick(clickPos) {
		this.player.midX = clickPos.x + this.cameraPos.x;
		this.player.midY = clickPos.y + this.cameraPos.y;
	}

	updateCamera() {
		this.cameraPos.x += 0.02 * (this.player.midX - this.cameraPos.x);
		this.cameraPos.y += 0.02 * (this.player.midY - this.cameraPos.y);
	}

	/**
	 * 
	 * @param {!CanvasRenderingContext2D} context 
	 */
	render(context) {
		context.save();

		context.translate(-this.cameraPos.x, -this.cameraPos.y);

        for (const coin of this.coins) {
            coin.render(context);
        }
        this.player.render(context);

		context.restore();
	}

}
