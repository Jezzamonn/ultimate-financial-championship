import Controller from './controller.js';
import Canvas from 'canvas';
import fs from 'fs';
import GIFEncoder from 'gifencoder';
import singleLineLog from 'single-line-log';

const width = 500;
const height = 500;
const fps = 30;
const numSubFrames = 4; // how many frames are used to create the motion blur

function renderFrame(context, controller) {
    context.resetTransform();
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // Set origin to middle.
    context.translate(canvas.width / 2, canvas.height / 2);
    
    controller.render(context);
}

function averageImageDatas(imageDatas, outImageData) {
    for (let i = 0; i < outImageData.data.length; i ++) {
        let sum = imageDatas.map(imageData => imageData.data[i]).reduce((a, b) => a + b, 0);
        outImageData.data[i] = sum / imageDatas.length;
    }
    return outImageData;
}

const canvas = new Canvas(width, height);
const context = canvas.getContext('2d');
const controller = new Controller();
controller.update(0);

const encoder = new GIFEncoder(width, height);
encoder.createReadStream().pipe(fs.createWriteStream('test.gif'))
encoder.start();
encoder.setRepeat(0);
encoder.setDelay(1000 / fps);
encoder.setQuality(10);

const subFrameTime = (1 / fps) / numSubFrames;

while (true) {
    const lastAnimAmt = controller.animAmt;

    const subframes = [];
    for (let i = 0; i < numSubFrames; i ++) {
        renderFrame(context, controller);
        subframes.push(context.getImageData(0, 0, width, height));

        controller.update(subFrameTime);
    }

    const averagedFrame = averageImageDatas(subframes, context.createImageData(width, height));
    context.putImageData(averagedFrame, 0, 0);
    encoder.addFrame(context);

    // we've looped back to the start
    if (controller.animAmt < lastAnimAmt) {
        break;
    }
    singleLineLog.stdout("Generating gif " + controller.animAmt);
}

encoder.finish();

console.log("Totes doneage");