export class Entity {

    constructor() {
        this.x = 0;
        this.y = 0;
        // height and width
        this.width = 0;
        this.height = 0;
    }

    get minX() {
        return this.x;
    }
    set minX(val) {
        this.x = val;
    }

    get midX() {
        return this.x + this.width / 2;
    }
    set midX(val) {
        this.x = val - this.width / 2;
    }

    get maxX() {
        return this.x + this.width;
    }
    set maxX(val) {
        this.x = val - this.width;
    }

    get minY() {
        return this.y;
    }
    set minY(val) {
        this.y = val;
    }

    get midY() {
        return this.y + this.height / 2;
    }
    set midY(val) {
        this.y = val - this.height / 2;
    }

    get maxY() {
        return this.y + this.height;
    }
    set maxY(val) {
        this.y = val - this.height;
    }

    update(dt) {
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    render(context) {
        context.fillStyle = 'blue';
        context.fillRect(this.minX, this.minY, this.width, this.height);
    }

    isTouching(entity) {
        return (
            this.minX < entity.maxX && entity.minX < this.maxX &&
            this.minY < entity.maxY && entity.minY < this.maxY
        );
    }

    sqGroundDistBetween(entity) {
        const dx = this.midX - entity.midX;
        const dy = this.maxY - entity.maxY;
        return (dx * dx + dy * dy);
    }
}
