import World from "./world";
import Fight from "./fight/fight";

export default class Controller {

	constructor() {
		this.world = new World(this);
		this.fight = new Fight(this, this.world.player, this.world.others[0]);
	}

	update(dt) {
		this.world.update(dt);
		this.fight.update(dt);
	}

	onMouseClick(clickPos) {
		this.world.onMouseClick(clickPos);
	}

	/**
	 * 
	 * @param {!CanvasRenderingContext2D} context 
	 */
	render(context) {
		this.world.canvasManager.clear();
		this.world.render();

		this.fight.canvasManager.clear();
		this.fight.render();
	}

	resize() {
		this.world.canvasManager.resize();
		this.fight.canvasManager.resize();
	}

}
