export class PlayerState {

    constructor() {
        this.money = 0;
        this.dividends = 0;
        
        this.countSeconds = 0;
        this.tickLengthSeconds = 0.5;
    }

    update(dt) {
        this.countSeconds += dt;
        if (this.countSeconds > this.tickLengthSeconds) {
            this.countSeconds = 0;

            this.tick();
        }
    }

    tick() {
        this.money += this.dividends;

        document.querySelector('#money').innerText = this.money;
        document.querySelector('#dividends').innerText = this.dividends;
    }
}
