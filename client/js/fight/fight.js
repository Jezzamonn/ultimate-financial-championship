import { Player } from "../player";
import { Coin } from "../coin";
import Chance from "chance";
import { CanvasManager } from "../canvasManager";
import { StockBar } from "./stockBar";
import { StockData } from "./stock-data";
import Controller from '../controller';
import { FightData } from "./fight-data";
import { clamp } from "../util";
import { playSound } from "../sounds";

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
		// TODO: Pull this from somewhere???

		this.player1Data = new FightData(1000, 0);
		this.player2Data = new FightData(1000, 0);

		// State stuff?
		this.timeCount = -3.01;
		this.maxTime = 10;
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
			playSound("click");
		}

		this.sell = () => {
			const price = this.stockData.getValueAtTime(this.timeAmt);
			this.player1Data.trySell(price);
			this.updateUi();
			playSound("click");
		}

		this.addButtonListeners();
	}

	get timeAmt() {
		return this.timeCount / this.maxTime;
	}

	restoreUI() {
		for (const el of document.querySelectorAll('.fight-countdown')) {
			el.classList.remove('hidden-left');
			el.classList.add('hidden-right');
		}
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
		this.timeCount += dt;

		if (this.timeCount > this.maxTime + 2) {
			this.done = true;
		}
		this.stockBar.timeAmt = this.timeAmt;

		this.updateUi(this.timeCount - dt, this.timeCount);
	}

	updateUi(lastTimeCount, timeCount) {
		const price = this.stockData.getValueAtTime(this.timeAmt);
		this.player1Data.updateUi(price, '#fight-money', '#fight-stock', '#fight-total');
		this.player2Data.updateUi(price, '#fight-money2', '#fight-stock2', '#fight-total2');

		if (atBoundary(lastTimeCount, timeCount, -3)) {
			document.querySelector('.countdown3').classList.remove('hidden-right');
			playSound("slide");
		}
		if (atBoundary(lastTimeCount, timeCount, -2)) {
			document.querySelector('.countdown2').classList.remove('hidden-right');
			document.querySelector('.countdown3').classList.add('hidden-left');
			playSound("slide");
		}
		if (atBoundary(lastTimeCount, timeCount, -1)) {
			document.querySelector('.countdown1').classList.remove('hidden-right');
			document.querySelector('.countdown2').classList.add('hidden-left');
			playSound("slide");
		}
		if (atBoundary(lastTimeCount, timeCount, 0)) {
			document.querySelector('.countdown0').classList.remove('hidden-right');
			document.querySelector('.countdown1').classList.add('hidden-left');
			playSound("slide");
		}
		if (atBoundary(lastTimeCount, timeCount, 0.5)) {
			document.querySelector('.countdown0').classList.add('hidden-left');
		}
		if (atBoundary(lastTimeCount, timeCount, this.maxTime)) {
			const price = this.stockData.getValueAtTime(1);
			if (this.player1Data.getValue(price) > this.player2Data.getValue(price)) {
				playSound("win");
			}
			if (this.player1Data.getValue(price) < this.player2Data.getValue(price)) {
				playSound("lose");
			}
		}
	}

	/**
	 * @param {!CanvasRenderingContext2D} context 
	 */
	render() {
		this.stockBar.render();
	}

	start() {
		document.querySelector('.fight').classList.add('fight-shown');

		playSound("fight");
	}

	endFight() {
		const price = this.stockData.getValueAtTime(1);
		if (this.player1Data.getValue(price) > this.player2Data.getValue(price)) {
			// Yay player1 wins
			// Ceil -> HA
			const moneyExchanged = Math.ceil(this.player2.state.money / 2);

			this.player1.state.money += moneyExchanged;
			this.player2.state.money -= moneyExchanged;

			this.player1.state.dividends += Math.floor(this.player1Data.getValue(price) / price);
		}
		else if (this.player1Data.getValue(price) < this.player2Data.getValue(price)) {
			const moneyExchanged = Math.ceil(this.player1.state.money / 2);

			this.player2.state.money += moneyExchanged;
			this.player1.state.money -= moneyExchanged;

			this.player2.state.dividends += Math.floor(this.player2Data.getValue(price) / price);
		}
		
		document.querySelector('.fight').classList.remove('fight-shown');
		this.restoreUI();
		playSound("slide");
	}

}

function atBoundary(lastTime, nowTime, timeToBeAt) {
	return (lastTime < timeToBeAt && nowTime >= timeToBeAt);
}