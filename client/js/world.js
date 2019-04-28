import { Player } from "./player";
import { Coin } from "./coin";
import Chance from "chance";
import { CanvasManager } from "./canvasManager";

export default class World {

	constructor(controller) {
		this.controller = controller;
		this.canvasManager = new CanvasManager('#world-canvas');

        this.coins = [];
		this.others = [];
		this.player = new Player(this);
		this.player.name = "Me";
		this.cameraPos = {x: 0, y: 0};

		this.chance = new Chance(1)

		this.initThings();
	}

	initThings() {
		// This will eventually go elsewhere but w/e
        for (let i = 0; i < 10; i++) {
            const coin = new Coin();
            coin.x = 200 * (2 * Math.random() - 1);
            coin.y = 200 * (2 * Math.random() - 1);
            this.coins.push(coin);
		}
		
		for (let i = 0; i < 10; i++) {
			const player = new Player();
            player.x = 400 * (2 * Math.random() - 1);
			player.y = 400 * (2 * Math.random() - 1);
			player.name = this.chance.name();
			this.others.push(player);
		}
	}

	update(dt) {
		for (const player of this.others) {
			player.update(dt);
		}
		for (const coin of this.coins) {
            coin.update(dt);
		}

		this.player.update(dt);
		this.player.playerUpdate(dt);

		this.updateCamera();
	}

	onMouseClick(clickPos) {
		const localClickPoint = {
			x: (clickPos.x / this.canvasManager.gameScale) + this.cameraPos.x,
			y: (clickPos.y / this.canvasManager.gameScale) + this.cameraPos.y,
		};
		// haha, who cares about passing mutable reference values, amiright??
		this.player.desiredPoint = localClickPoint;

		this.checkFightClick(localClickPoint);
	}

	checkFightClick(localClickPoint) {
		this.others.sort((a, b) => a.maxY - b.maxY);

		for (const other of this.others) {
			if (other.isTouchingPoint(localClickPoint)) {
				this.controller.startFight(this.player, other);
				return;
			}
		}
	}

	updateCamera() {
		this.cameraPos.x += 0.02 * (this.player.midX - this.cameraPos.x);
		this.cameraPos.y += 0.02 * (this.player.midY - this.cameraPos.y);
	}

	/**
	 * 
	 * @param {!CanvasRenderingContext2D} context 
	 */
	render() {
		const context = this.canvasManager.context;
		
		context.save();

		context.translate(Math.round(-this.cameraPos.x), Math.round(-this.cameraPos.y));

		const toRender = [...this.coins, ...this.others, this.player];
		toRender.sort((a, b) => a.maxY - b.maxY);

        for (const r of toRender) {
			r.render(context);
		}

		context.restore();
	}

}
