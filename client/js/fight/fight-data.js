export class FightData {

    constructor(money, stocks) {
        this.money = money;
        this.stocks = stocks;
    }

    tryBuy(price) {
        if (this.money < price) {
            return;
        }
        this.money -= price;
        this.stocks += 1;
    }

    trySell(price) {
        if (this.stocks <= 0) {
            return;
        }
        this.stocks -= 1;
        this.money += price;
    }

    getValue(price) {
        return this.money + price * this.stocks;
    }
    
    updateUi(price, multiple, moneySelector, stockSelector, totalSelector) {
        document.querySelector(moneySelector).innerText = Math.round(multiple * this.money);
        document.querySelector(stockSelector).innerText = Math.round(multiple * this.stocks);
        document.querySelector(totalSelector).innerText = Math.round(multiple * this.getValue(price));
    }

    toObject() {
        return {
            money: this.money,
            stocks: this.stocks
        };
    }

    fromObject(obj) {
        this.money = obj.money;
        this.stocks = obj.stocks;
    }

}