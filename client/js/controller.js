import { rgb } from "./util";
import { PlayerState } from "./player-state";
import { Player } from "./player";

export default class Controller {

	constructor() {
		this.animAmt = 0;
		this.period = 3;

		this.playerState = new PlayerState();

		this.player = new Player();
		this.cameraPos = {x: 0, y: 0};
	}

	update(dt) {
		this.animAmt += dt / this.period;
		this.animAmt %= 1;

		this.playerState.update(dt);

		this.player.update();

		this.updateCamera();
	}

	onMouseClick(clickPos) {
		this.player.pos.x = clickPos.x + this.cameraPos.x;
		this.player.pos.y = clickPos.y + this.cameraPos.y;
	}

	updateCamera() {
		this.cameraPos.x += 0.02 * (this.player.pos.x - this.cameraPos.x);
		this.cameraPos.y += 0.02 * (this.player.pos.y - this.cameraPos.y);
	}

	/**
	 * 
	 * @param {!CanvasRenderingContext2D} context 
	 */
	render(context) {
		context.save();

		context.translate(-this.cameraPos.x, -this.cameraPos.y);

		this.player.render(context);

		context.restore();
	}

}
