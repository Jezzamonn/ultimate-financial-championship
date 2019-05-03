import { SCALE } from "./constants";

// Just prescale these, hey
const IMAGE_NAMES = [
    "player",
    "player-black",
    "player-blue",
    "player-gold",
    "player-green",
    "player-purple",
    "player-white",
    "coin"
];

const images = {};

// TODO??? Load images as they're needed?? Nah
export function loadImages() {
    for (const name of IMAGE_NAMES) {
        if (images.hasOwnProperty(name)) {
            continue;
        }

        images[name] = {
            loaded: false,
            image: null,
            animations: {},
        };
        
        const image = new Image();
        image.onload = () => {
            images[name].image = image;
            images[name].loaded = true;
        }
        image.onerror = () => {
            throw new Error(`Error loading ${name}`)
        }
        image.src = `assets/${name}.png`;

        // Load JSON
        fetch(`assets/${name}.json`)
        .then((response) => {
            if (response.status != 200) {
                throw new Error(`didn't load json`);
            }
            return response.json();
        })
        .then((response) => {
            const animations = {};
            for (const animData of response.meta.frameTags) {
                const animation = {
                    from: animData.from,
                    to: animData.to,
                }
                let length = 0;
                for (let i = animData.from; i <= animData.to; i++) {
                    length += response.frames[i].duration;
                }
                animation.length = length;
                animations[animData.name] = animation;
            }
            images[name].animations = animations;
            images[name].frames = response.frames;
        });
    }
}

/**
 * @param {!CanvasRenderingContext2D} context 
 */
export function drawSprite(context, imageData, frame, x, y, anchorX = 0, anchorY = 0) {
    if (typeof imageData === "string") {
        imageData = images[imageData];
    }

    if (!imageData.loaded) {
        return;
    }

    const frameInfo = imageData.frames[frame].frame;
    context.drawImage(
        imageData.image,
        frameInfo.x, frameInfo.y,
        frameInfo.w, frameInfo.h,
        Math.round(x - anchorX * SCALE * frameInfo.w), Math.round(y - anchorY * SCALE * frameInfo.h),
        SCALE * frameInfo.w, SCALE * frameInfo.h);
}

/**
 * @param {!CanvasRenderingContext2D} context 
 * @param {!HTMLImageElement|string} image 
 */
export function drawAnimation(context, imageData, animationName, time, x, y, anchorX = 0, anchorY = 0) {
    if (typeof imageData === "string") {
        imageData = images[imageData];
    }

    if (!imageData.loaded) {
        return;
    }

    const frame = getFrame(imageData, animationName, time);

    drawSprite(context, imageData, frame, x, y, anchorX, anchorY);
}

function getFrame(imageData, animationName, time) {
    const animData = imageData.animations[animationName];
    const localTimeMs = (1000 * time) % animData.length;
    let cumulativeTimeMs = 0;
    for (let i = animData.from; i <= animData.to; i++) {
        cumulativeTimeMs += imageData.frames[i].duration;
        if (cumulativeTimeMs > localTimeMs) {
            return i;
        }
    }
    throw new Error(`Something's wrong with the getFrame function`);
}

export function disableSmoothing(context) {
    context.msImageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
}

/// just load all the images straight away I guess
loadImages();