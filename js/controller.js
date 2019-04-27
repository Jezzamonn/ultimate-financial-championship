import { rgb } from "./util";

export default class Controller {

	constructor() {
		this.animAmt = 0;
		this.period = 3;
	}

	update(dt) {
		this.animAmt += dt / this.period;
		this.animAmt %= 1;
	}

	/**
	 * 
	 * @param {CanvasRenderingContext2D} context 
	 */
	render(context) {
		context.beginPath();
		context.fillStyle = 'blue'; var a = rgb(
			Math.floor(Math.random() * 255),
			Math.floor(Math.random() * 255),
			Math.floor(Math.random() * 255),
		);
		context.fillRect(-0.5 * context.canvas.width, -0.5 * context.canvas.height, context.canvas.width, context.canvas.height);
	}

}
