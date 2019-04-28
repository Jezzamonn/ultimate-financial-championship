
export class CanvasManager {

    constructor(selector) {
        this.canvas = document.querySelector(selector);
        this.context = this.canvas.getContext('2d');

        // Currently assuming square proportions.
        this.size = 500;
        this.pixelScale = 1;
        this.gameScale = 1;

        this.resize();
    }
    
    clear() {
        // Clear the previous frame
        this.context.resetTransform();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Set origin to middle and scale canvas
        this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.context.scale(this.pixelScale, this.pixelScale);
    }

    resize() {
        let pixelRatio = window.devicePixelRatio || 1;
        let width = window.innerWidth;
        let height = window.innerHeight;
        
        this.canvas.width = width * pixelRatio;
        this.canvas.height = height * pixelRatio;
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';
        
        // Math.max -> no borders (will cut off edges of the thing)
        // Math.min -> show all (with borders)
        // There are other options too :)
        this.pixelScale = Math.min(this.canvas.width, this.canvas.height) / this.size;
        this.gameScale = this.pixelScale / pixelRatio;
    }

}
