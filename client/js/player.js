import { drawAnimation } from "./sprites";
import { SCALE } from "./constants";
import { Entity } from "./entity";
import { PlayerState } from "./player-state";

export class Player extends Entity {

    constructor(world) {
        super();

        this.name = '';

        this.world = world;

        this.state = new PlayerState();

        this.width = SCALE * 8;
        this.height = SCALE * 8;

        this.animCount = 10 * Math.random();
        this.animState = "Idle";

        this.desiredPoint = null;
        this.velX = 0;
        this.velY = 0;

        // Per second
        this.accel = 1;
        this.maxSpeed = 5;
        this.stopSpeed = 0.1;
        this.minDist = 2;
        this.speedDamp = 0.8;

        this.minChallengeDist = 50;
    }

    update(dt) {
        this.animCount += dt;

        if (this.desiredPoint) {
            this.moveTowardsPoint(dt);
        }
        this.dampSpeed();

        this.x += this.velX;
        this.y += this.velY;
    }

    dampSpeed(dt) {
        this.velX *= this.speedDamp;
        this.velY *= this.speedDamp;
    }

    moveTowardsPoint(dt) {
        const dx = this.desiredPoint.x - this.midX;
        const dy = this.desiredPoint.y - this.midY;
        const sqDist = dx * dx + dy * dy;

        this.velX += dt * this.accel * dx;
        this.velY += dt * this.accel * dy;

        const speed = Math.sqrt(this.velX * this.velX + this.velY * this.velY);
        if (speed > this.maxSpeed) {
            this.velX *= this.maxSpeed / speed;
            this.velY *= this.maxSpeed / speed;
        }

        if (sqDist < this.minDist * this.minDist && speed < this.stopSpeed * this.stopSpeed) {
            this.desiredPoint = null;
            this.setAnimState("Idle");
        }
        else {
            this.setAnimState("Run");
        }
    }

    setAnimState(state) {
        if (this.animState != state) {
            this.animCount = 0;
        }
        this.animState = state;
    }

    playerUpdate(dt) {
        this.getCoins();

        this.tryShowChallengeUI();

        // Update monies
        this.state.update(dt);
    }

    getCoins() {
        for (let i = this.world.coins.length - 1; i >= 0; i--) {
            const coin = this.world.coins[i];
            if (this.isTouching(coin)) {
                this.world.coins.splice(i, 1);
                this.state.money += 1;
                this.state.updateUI();
            }
        }
    }

    tryShowChallengeUI() {
        let closestPlayer = null;
        let closestDist = Infinity;
        for (const player of this.world.others) {
            const dist = this.sqGroundDistBetween(player)
            if (dist < closestDist) {
                closestPlayer = player;
                closestDist = dist;
            }
        }

        if (closestDist < this.minChallengeDist * this.minChallengeDist) {
            document.querySelector('#nearby').innerText = closestPlayer.name;
        }
        else {
            document.querySelector('#nearby').innerText = '';
        }
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    render(context) {
        drawAnimation(context, "player", this.animState, this.animCount, this.midX, this.maxY, 0.5, 1);
    }
}
