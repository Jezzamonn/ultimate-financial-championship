import { Player } from "../player";
import { Coin } from "../coin";
import Chance from "chance";
import CanvasManager from "../canvasManager";
import StockBar from "./stockBar";

export default class Fight {

	constructor(controller, person1, person2) {
        this.controller = controller;

		this.canvasManager = new CanvasManager('#fight-canvas');

		this.person1 = person1;
		this.person2 = person2;
		
		this.stockBar = new StockBar();
	}

	update(dt) {
		this.stockBar.update(dt);
	}

	onMouseClick(clickPos) {
	}

	/**
	 * @param {!CanvasRenderingContext2D} context 
	 */
	render() {
		const context = this.canvasManager.context;

        context.beginPath();
        context.fillStyle = 'blue';
		context.fillRect(-1000, -1000, 2000, 2000);
		
		this.stockBar.render();
	}

}
