import Controller from './controller.js';
import { PlayerState } from './player-state.js';

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

// Currently assuming square proportions.
const SIZE = 500;

let scale = 1;
let lastTime = null;
/** @type {!Controller} */
let controller = null;

function init() {
	lastTime = Date.now();
	controller = new Controller();

	handleResize();
	// Set up event listeners.
	window.addEventListener('resize', handleResize);
	// Kick off the update loop
	window.requestAnimationFrame(everyFrame);

	document.querySelector('#money-button').addEventListener('click', () => {
		controller.playerState.money += 1;
		controller.playerState.updateUI();
	});
	document.querySelector('#dividend-button').addEventListener('click', () => {
		controller.playerState.money -= 10;
		controller.playerState.dividends += 1;
		controller.playerState.updateUI();
	});

	document.addEventListener('mousedown', (evt) => {
		controller.onMouseClick(getClickCoordinates(evt))
	});
}

// TODO: Make tweak this to allow frame skipping for slow computers. Maybe.
function everyFrame() {
	update();
	render();
	requestAnimationFrame(everyFrame);
}

function update() {
	let curTime = Date.now();
	let dt = (curTime - lastTime) / 1000;
	controller.update(dt);
	lastTime = curTime;
}

function getClickCoordinates(evt) {
	return {
		x: evt.clientX - window.innerWidth / 2,
		y: evt.clientY - window.innerHeight / 2
	}
}

function render() {
	// Clear the previous frame
	context.resetTransform();
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Set origin to middle and scale canvas
	context.translate(canvas.width / 2, canvas.height / 2);
	context.scale(scale, scale);

	controller.render(context);
}

function handleResize(evt) {
	let pixelRatio = window.devicePixelRatio || 1;
	let width = window.innerWidth;
	let height = window.innerHeight;

	canvas.width = width * pixelRatio;
	canvas.height = height * pixelRatio;
	canvas.style.width = width + 'px';
	canvas.style.height = height + 'px';

	// Math.max -> no borders (will cut off edges of the thing)
	// Math.min -> show all (with borders)
	// There are other options too :)
	scale = Math.min(canvas.width, canvas.height) / SIZE;

	render();
}

init();