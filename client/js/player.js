import { drawAnimation } from "./sprites";
import { SCALE } from "./constants";
import { Entity } from "./entity";
import { PlayerState } from "./player-state";
import { playSound } from "./sounds";

const LEVEL_COLORS = {
    0: 'white',
    1: 'blue',
    2: 'green',
    3: 'purple',
    4: 'black',
    5: 'gold',
}

export class Player extends Entity {

    constructor(world) {
        super();

        this.name = '';
        this.id = -1;

        this.world = world;

        this.state = new PlayerState();

        this.width = SCALE * 8;
        this.height = SCALE * 8;

        this.animCount = 10 * Math.random();
        this.animState = "Idle";
        this.facingRight = Math.random() < 0.5;

        this.desiredPoint = null;
        this.velX = 0;
        this.velY = 0;

        // Per second
        this.accel = 1;
        this.maxSpeed = 5;
        this.stopSpeed = 0.1;
        this.minDist = 2;
        this.speedDamp = 0.8;

        this.minChallengeDist = 200;

        this.level = 0;
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
            if (dx > 0.1) {
                this.facingRight = true;
            }
            else if (dx < -0.1) {
                this.facingRight = false;
            }
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

    getUpdateData() {
        const obj = {
            id: this.id,
            name: this.name,
            x: this.x,
            y: this.y,
            money: this.state.money,
            dividends: this.state.dividends,
        }
        if (this.desiredPoint) {
            obj.dx = this.desiredPoint.x;
            obj.dy = this.desiredPoint.y;
        }
        return obj;
    }

    initFromData(data) {
        this.id = parseInt(data.id);
        this.name = data.name;
        this.x = parseInt(data.x);
        this.y = parseInt(data.y);
        this.state.money = parseInt(data.money);
        this.state.dividends = parseInt(data.dividends);
    }

    updateFromData(data) {
        if (data.hasOwnProperty('dx') && data.hasOwnProperty('dy')) {
            this.desiredPoint = {
                x: parseInt(data.dx),
                y: parseInt(data.dy),
            }
        }
        this.state.money = parseInt(data.money);
        this.state.dividends = parseInt(data.dividends);
   }

    getCoins() {
        for (const coinId in this.world.coins) {
            const coin = this.world.coins[coinId];
            if (this.isTouching(coin)) {
                delete this.world.coins[coinId];

                this.state.money += 1;
                this.state.updateUI();
                
                window.socket.emit('take-coin', {id: coin.id});

                playSound("coin");
            }
        }
    }

    tryShowChallengeUI() {
        let closestPlayer = null;
        let closestDist = Infinity;
        for (const player of Object.values(this.world.others)) {
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
        const facingString = this.facingRight ? "Right" : "Left";
        const levelString = LEVEL_COLORS[this.level];
        drawAnimation(context, `player-${levelString}`, `${this.animState}${facingString}`, this.animCount, this.midX, this.maxY, 0.5, 1);
    }
}
