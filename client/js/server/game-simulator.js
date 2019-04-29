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
            x: 300 * (2 * Math.random() - 1),
            y: 300 * (2 * Math.random() - 1),
        };
        this.coins.push(coin);

        this.nextCoinId++;
    }

    addCoins() {
        while (this.coins.length < this.totalCoins) {
            this.addCoin();
        }
    }

    updatePlayer(playerData) {
        for (const player of this.players) {
            if (player.id != playerData.id) {
                continue;
            }
            player.x = playerData.x;
            player.y = playerData.y;
            player.money = playerData.money;
            player.dividends = playerData.dividends;
            if (playerData.hasOwnProperty('dx') && playerData.hasOwnProperty('dy')) {
                player.dx = playerData.dx;
                player.dy = playerData.dy;
            }
            return;
        }
        // We didn't find this player, so it's a new one. Update the dang thing
        this.players.push(playerData);
    }
}