import { Player } from "../player";
import { Coin } from "../coin";
import Chance from "chance";
import { CanvasManager } from "../canvasManager";
import { StockBar } from "./stockBar";
import { StockData } from "./stock-data";
import Controller from '../controller';
import { FightData } from "./fight-data";

export default class Fight {

	/**
	 * @param {Controller} controller 
	 * @param {Player} player1 
	 * @param {Player} player2 
	 */
	constructor(controller, player1, player2) {
        this.controller = controller;
		this.player1 = player1;
		this.player2 = player2;

		// Data
		this.stockData = new StockData();
		this.stockData.data = [200, 123, 120, 230, 300, 201, 600, 800, 20];

		this.player1Data = new FightData(1000, 0);
		this.player2Data = new FightData(1000, 0);

		// State stuff?
		this.timeAmt = 0;
		this.done = false;

		// Initing UI, etc
		this.canvasManager = new CanvasManager('#fight-canvas');
		this.stockBar = new StockBar();
		this.stockBar.data = this.stockData;

		this.buyButton = document.querySelector("#buy-button");
		this.sellButton = document.querySelector("#sell-button");

		this.buy = () => {
			const price = this.stockData.getValueAtTime(this.timeAmt);
			this.player1Data.tryBuy(price);
			this.updateUi();
		}

		this.sell = () => {
			const price = this.stockData.getValueAtTime(this.timeAmt);
			this.player1Data.trySell(price);
			this.updateUi();
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

	update(dt) {
		// TODO: Update this this slowly
		this.timeAmt += dt / 10;
		if (this.timeAmt > 1.2) {
			this.done = true;
		}

		this.stockBar.timeAmt = this.timeAmt;
	}

	updateUi() {
		const price = this.stockData.getValueAtTime(this.timeAmt);
		this.player1Data.updateUi(price, '#fight-money', '#fight-stock', '#fight-total')
		this.player2Data.updateUi(price, '#fight-money2', '#fight-stock2', '#fight-total2')
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

		this.updateUi();
	}

}
