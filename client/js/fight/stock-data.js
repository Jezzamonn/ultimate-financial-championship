import {slurp} from "../util";

export class StockData {

    constructor() {
        this.data = [];
    }

    getValueAtTime(t) {
        return this.getValueAtFloatIndex(this.getFloatIndex(t));
    }

    getValueAtFloatIndex(floatIndex) {
        const firstIndex = Math.floor(floatIndex);
        const firstValue = this.data[firstIndex];

        const secondIndex = firstIndex + 1;
        let secondValue = 0;
        if (secondIndex < this.data.length) {
            secondValue = this.data[secondIndex];
        }

        const extraAmt = floatIndex % 1;
        const value = slurp(firstValue, secondValue, extraAmt);
        return value;
    }

    getFloatIndex(t) {
        return (this.data.length - 1) * t;
    }

    getBestSoFar(t) {
        let highest = -Infinity;
        const floatIndex = this.getFloatIndex(t);
        const indices = [...Array(Math.ceil(floatIndex)).keys(), floatIndex];
        for (let i = 0; i < indices.length; i++) {
            const index = indices[i];
            const value = this.getValueAtFloatIndex(index)
            highest = Math.max(value, highest);
        }
        return highest;
    }
    
    getWorstSoFar(t) {
        let lowest = Infinity;
        const floatIndex = this.getFloatIndex(t);
        const indices = [...Array(Math.ceil(floatIndex)).keys(), floatIndex];
        for (let i = 0; i < indices.length; i++) {
            const index = indices[i];
            const value = this.getValueAtFloatIndex(index)
            lowest = Math.min(value, lowest);
        }
        return lowest;
    }

    getUiTop(t) {
        return Math.max(this.data[0] * 1.5, this.getBestSoFar(t))
    }

    getUiBottom(t) {
        return Math.min(this.data[0] * 0.5, this.getWorstSoFar(t))
    }
}