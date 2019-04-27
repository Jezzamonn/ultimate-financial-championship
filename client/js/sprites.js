// Just prescale these, hey
const IMAGE_SRCS = [
    "char.png",
    "coin.png",
];

const images = {};

export function getImage(name) {
    return images[name];
}

// TODO??? Load images as they're needed?? Nah
export function loadImages() {
    for (const imageSrc of IMAGE_SRCS) {
        const name = imageSrc.split('.')[0];
        if (images.hasOwnProperty(name)) {
            continue;
        }
        images[name] = null;
        
        const image = new Image();
        image.onload = () => {
            images[name] = image;
        }
        image.onerror = () => {
            throw new Error(`Error loading ${imageSrc}`)
        }
        image.src = `assets/${imageSrc}`;
    }
}

/**
 * Helper function to get out the things from a sprite sheet
 * @param {!HTMLImageElement} image 
 */
export function getSpriteInfo(image, frame, spriteWidth, spriteHeight) {
    const spritesPerRow = Math.floor(image.width / spriteWidth);
    const frameCol = frame % spritesPerRow;
    const frameRow = Math.floor(frame / spritesPerRow);

    return {sx: frameCol * spriteWidth, sy: frameRow * spriteHeight};
}

/**
 * @param {!CanvasRenderingContext2D} context 
 * @param {!HTMLImageElement|string} image 
 */
export function drawSprite(context, image, frame, x, y, spriteWidth, spriteHeight) {
    if (typeof image === "string") {
        image = getImage(image);
    }

    if (image === null) {
        // Can't draw an empty image you dangus
        return;
    }

    const {sx, sy} = getSpriteInfo(image, frame, spriteWidth, spriteHeight);
    context.drawImage(image, sx, sy, spriteWidth, spriteHeight, x, y, spriteWidth, spriteHeight);
}

/// just load all the images straight away I guess
loadImages();