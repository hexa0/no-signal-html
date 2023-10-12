const SPEED = 16;
const RATE = 1;
const IMAGE_DIMENSIONS = [417, 180];

let currentDirection = [Math.random() < 0.5 ? 1 : -1, Math.random() < 0.5 ? 1 : -1];
let currentPositionX = Math.floor((Math.random() * (window.innerWidth - IMAGE_DIMENSIONS[0])) / SPEED) * SPEED;
let currentPositionY = Math.floor((Math.random() * (window.innerHeight - IMAGE_DIMENSIONS[1])) / SPEED) * SPEED;

const noSignal = document.getElementById("no-signal");

noSignal.style.position = "fixed";
noSignal.style.imageRendering = "pixelated";
noSignal.style.zIndex = Number.MAX_VALUE;
noSignal.style.left = `${currentPositionX}px`;
noSignal.style.top = `${currentPositionY}px`;

function update() {
	currentPositionX += (SPEED) * currentDirection[0];
	currentPositionY += (SPEED) * currentDirection[1];
	noSignal.style.left = `${Math.floor(currentPositionX)}px`;
	noSignal.style.top = `${Math.floor(currentPositionY)}px`;

	// x
	if ((currentPositionX + IMAGE_DIMENSIONS[0] >= window.innerWidth)) {
		currentDirection[0] *= -1
		currentPositionX = window.innerWidth - IMAGE_DIMENSIONS[0]
		if (Math.random() <= 0.12) {
			currentDirection[1] *= -1
		}
	}

	if (currentPositionX <= 0) {
		currentDirection[0] *= -1
		currentPositionX = 0
		if (Math.random() <= 0.12) {
			currentDirection[1] *= -1
		}
	}

	// y
	if ((currentPositionY + IMAGE_DIMENSIONS[1] >= window.innerHeight)) {
		currentDirection[1] *= -1
		currentPositionY = window.innerHeight - IMAGE_DIMENSIONS[1]
		if (Math.random() <= 0.12) {
			currentDirection[0] *= -1
		}
	}

	if (currentPositionY <= 0) {
		currentDirection[1] *= -1
		currentPositionY = 0
		if (Math.random() <= 0.12) {
			currentDirection[0] *= -1
		}
	}
}

document.documentElement.style.cursor = 'none';

window.mainInterval = setInterval(() => {
	update()
}, RATE * 1000)

// https://www.w3schools.com/howto/howto_js_fullscreen.asp
function fullscreen() {
	if (document.documentElement.requestFullscreen) {
		document.documentElement.requestFullscreen();
	} else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
		document.documentElement.webkitRequestFullscreen();
	} else if (document.documentElement.msRequestFullscreen) { /* IE11 */
		document.documentElement.msRequestFullscreen();
	}
}

function exitFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) { /* Safari */
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) { /* IE11 */
		document.msExitFullscreen();
	}
}

// https://stackoverflow.com/questions/2863351/checking-if-browser-is-in-fullscreen
function toggleFullscreen() {
	if (!window.screenTop && !window.screenY) {
		exitFullscreen();
	} else {
		fullscreen();
	}
}

document.onkeydown = function (event) {
	switch (event.key) {
		case "r":
			currentDirection = [Math.random() < 0.5 ? 1 : -1, Math.random() < 0.5 ? 1 : -1];
			currentPositionX = Math.floor((Math.random() * (window.innerWidth - IMAGE_DIMENSIONS[0])) / SPEED) * SPEED;
			currentPositionY = Math.floor((Math.random() * (window.innerHeight - IMAGE_DIMENSIONS[1])) / SPEED) * SPEED;
			update();
			break
		case "ArrowRight":
			currentDirection[0] = 1
			currentDirection[1] = 0
			update();
			currentDirection[1] = Math.random() < 0.5 ? 1 : -1
			break
		case "ArrowLeft":
			currentDirection[0] = -1
			currentDirection[1] = 0
			update();
			currentDirection[1] = Math.random() < 0.5 ? 1 : -1
			break
		case "ArrowDown":
			currentDirection[1] = 1
			currentDirection[0] = 0
			update();
			currentDirection[0] = Math.random() < 0.5 ? 1 : -1
			break
		case "ArrowUp":
			currentDirection[1] = -1
			currentDirection[0] = 0
			update();
			currentDirection[0] = Math.random() < 0.5 ? 1 : -1
			break
		case "f":
			toggleFullscreen();
			break
	}
}

document.documentElement.onclick = () => {
	toggleFullscreen();
}