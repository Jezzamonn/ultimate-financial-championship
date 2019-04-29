import Controller from './controller.js';
import io from 'socket.io-client';

let lastTime = null;
/** @type {!Controller} */
let controller = null;

const serverAddress = "http://34.74.40.132:3000"
let socket = null;

function init() {
	lastTime = Date.now();
	controller = new Controller();

	window.addEventListener('resize', resize);
	resize();

	// Kick off the update loop
	window.requestAnimationFrame(everyFrame);

	// document.querySelector('#money-button').addEventListener('click', () => {
	// 	controller.world.player.state.money += 1;
	// 	controller.world.player.state.updateUI();
	// });
	// document.querySelector('#dividend-button').addEventListener('click', () => {
	// 	controller.world.player.state.money -= 10;
	// 	controller.world.player.state.dividends += 1;
	// 	controller.world.player.state.updateUI();
	// });

	document.addEventListener('mousedown', (evt) => {
		controller.onMouseClick(getClickCoordinates(evt))
	});

	initSocketIo();
}

function initSocketIo() {
	socket = new io(serverAddress)

	socket.on('world-update', (data) => {
		console.log(data);
		controller.worldUpdate(data);
	});

	// Don't have time to hook this up properly sooooo GLOBAL VARIABLE TIME
	window.socket = socket;
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
	controller.render();
}

function resize() {
	controller.resize();
	render();
}

window.onload = () => init();