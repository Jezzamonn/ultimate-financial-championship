import { rgb } from "./util";
import { PlayerState } from "./player-state";
import { Player } from "./player";

export default class Controller {

	constructor() {
		this.animAmt = 0;
		this.period = 3;

		this.playerState = new PlayerState();

		this.player = new Player();
	}

	update(dt) {
		this.animAmt += dt / this.period;
		this.animAmt %= 1;

		this.playerState.update(dt);

		this.player.update();
	}

	/**
	 * 
	 * @param {!CanvasRenderingContext2D} context 
	 */
	render(context) {
		this.player.render(context);
	}

}
