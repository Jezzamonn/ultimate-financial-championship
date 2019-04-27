import World from "./world";

export default class Controller {

	constructor() {
		this.world = new World();
	}

	update(dt) {
		this.world.update(dt);
	}

	onMouseClick(clickPos) {
		this.world.onMouseClick(clickPos);
	}

	/**
	 * 
	 * @param {!CanvasRenderingContext2D} context 
	 */
	render(context) {
		this.world.render(context);
	}

	resize() {
		this.world.canvasManager.resize();
	}

}
