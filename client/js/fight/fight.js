import { Player } from "../player";
import { Coin } from "../coin";
import Chance from "chance";
import { CanvasManager } from "../canvasManager";
import { StockBar } from "./stockBar";
import { StockData } from "./stock-data";

export default class Fight {

	constructor(controller, person1, person2) {
        this.controller = controller;
		this.person1 = person1;
		this.person2 = person2;

		this.stockData = new StockData();
		this.stockData.data = [50, 100, 50, 100];

		// Init game data
		this.player1Stocks = 0;
		this.player2Stocks = 0;

		// Initing UI, etc
		this.canvasManager = new CanvasManager('#fight-canvas');
		this.stockBar = new StockBar();
		this.stockBar.data = this.stockData;

		this.buyButton = document.querySelector("#buy-button");
		this.sellButton = document.querySelector("#sell-button");

		this.buy = () => {
			this.player1Stocks 
		}

		this.sell = () => {
		}

		this.addButtonListeners();
	}

	addButtonListeners() {
		this.buyButton.addEventListener('click', this.buy);
		this.sellButton.addEventListener('click', this.sell);
	}

	removeButtonListeners() {
		this.buyButton.removeEventListener('click', this.buy);
		this.sellButton.removeEventListener('click', this.sell);
	}

	start() {

	}

	update(dt) {
		this.stockBar.update(dt);
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
