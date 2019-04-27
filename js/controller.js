import { rgb } from "./util";
import { PlayerState } from "./player-state";

export default class Controller {

	constructor() {
		this.animAmt = 0;
		this.period = 3;

		this.playerState = new PlayerState();
	}

	update(dt) {
		this.animAmt += dt / this.period;
		this.animAmt %= 1;

		this.playerState.update(dt);
	}

	/**
	 * 
	 * @param {CanvasRenderingContext2D} context 
	 */
	render(context) {
	}

}
