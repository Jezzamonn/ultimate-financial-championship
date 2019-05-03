export class PlayerState {

    constructor() {
        this.money = 0;
        this.dividends = 0;
        
        this.countSeconds = 0;
        this.tickLengthSeconds = 0.5;

        // Empty function to be overwritten elsewhere
        this.onTick = () => {};
    }

    getLevel() {
        const levelThresholds = [
            100, // 0 (white) -> 1 (blue)
            10000, // 1 (blue) -> 2 (green)
            1000000, // 2 (green) -> 3 (purple)
            100000000, // 3 (puple) -> 4 (black)
            10000000000, // 4 (black) -> 5 (gold)
        ];
        for (let i = 0; i < levelThresholds.length; i++) {
            if (this.money < levelThresholds[i]) {
                return i;
            }
        }
        return levelThresholds.length;
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
        this.updateUI();

        this.onTick();
    }
    
    updateUI() {
        document.querySelector('#money').innerText = this.money;
        document.querySelector('#dividends').innerText = this.dividends;
    }
}
