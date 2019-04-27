import { drawSprite } from "./sprites";
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

        this.animCount = 0;
        this.animPeriod = 1;

        this.desiredPoint = null;
        this.velX = 0;
        this.velY = 0;

        // Per second
        this.accel = 1;
        this.maxSpeed = 5;
        this.minDist = 2;

        this.minChallengeDist = 10;
    }

    update(dt) {
        this.animCount += dt / this.animPeriod;
        this.animCount %= 1;

        if (this.desiredPoint) {
            this.moveTowardsPoint(dt);
        }
        this.dampSpeed();

        this.x += this.velX;
        this.y += this.velY;
    }

    dampSpeed(dt) {
        this.velX *= 0.9;
        this.velY *= 0.9;
    }

    moveTowardsPoint(dt) {
        const dx = this.desiredPoint.x - this.midX;
        const dy = this.desiredPoint.y - this.maxY;

        const sqDist = dx * dx + dy * dy;
        if (sqDist < this.minDist * this.minDist) {
            this.desiredPoint = null;
        }

        this.velX += dt * this.accel * dx;
        this.velY += dt * this.accel * dy;

        const speed = Math.sqrt(this.velX * this.velX + this.velY * this.velY);
        if (speed > this.maxSpeed) {
            this.velX *= this.maxSpeed / speed;
            this.velY *= this.maxSpeed / speed;
        }
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
        const frame = this.animCount < 0.5 ? 0 : 1;
        const spriteWidth = SCALE * 8;
        const spriteHeight = SCALE * 8;
        drawSprite(context, "char", frame, this.midX - spriteWidth / 2, this.maxY - spriteHeight, spriteWidth, spriteHeight);
    }
}
