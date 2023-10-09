const SPEED = 16;
const RATE = 1000;
const IMAGE_DIMENSIONS = [417, 180];

let currentDirection = [1, 1];
let currentPositionX = 0; // 16 * 90;
let currentPositionY = 0; // 16 * 2;

const noSignal = document.getElementById("no-signal");

noSignal.style.position = "fixed";
noSignal.style.imageRendering = "pixelated";
noSignal.style.zIndex = Number.MAX_VALUE;
noSignal.style.left = `${currentPositionX}px`;
noSignal.style.top = `${currentPositionY}px`;

function update() {
	currentPositionX += SPEED * currentDirection[0];
	currentPositionY += SPEED * currentDirection[1];
	noSignal.style.left = `${currentPositionX}px`;
	noSignal.style.top = `${currentPositionY}px`;

	// x
	if ((currentPositionX + IMAGE_DIMENSIONS[0] >= window.innerWidth) || currentPositionX <= 0) {
		currentDirection[0] *= -1
	}

	// y
	if ((currentPositionY + IMAGE_DIMENSIONS[1] >= window.innerHeight) || currentPositionY <= 0) {
		currentDirection[1] *= -1
	}
}

document.documentElement.style.cursor = 'none';

window.mainInterval = setInterval(() => {
	update()
}, RATE)