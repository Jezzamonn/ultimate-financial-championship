export class GameSimulator {

    constructor() {
        // Constants
        this.totalCoins = 30;

        // State
        this.nextCoinId = 0;

        this.coins = [];
        this.players = [];
        this.challenges = [];
        this.fights = [];
    }

    getWorldObject() {
        return {
            'coins': this.coins,
            'players': this.players,
        }
    }

    removeCoin(id) {
        for (let i = this.coins.length - 1; i >= 0; i--) {
            if (this.coins[i].id == id) {
                this.coins.splice(i, 1);
            }
        }
    }

    addCoin() {
        const coin = {
            id: this.nextCoinId,
            x: 800 * (2 * Math.random() - 1),
            y: 800 * (2 * Math.random() - 1),
        };
        this.coins.push(coin);

        this.nextCoinId++;
    }

    addCoins() {
        while (this.coins.length < this.totalCoins) {
            this.addCoin();
        }
    }
}