import * as THREE from "three";
import { Cube, KEYBOARD_MAPPINGS, Move } from "./cube";
import * as TWEEN from "../tween";
const CANVAS = document.querySelector("#c") as HTMLCanvasElement;

CANVAS.addEventListener("keypress", (ev) => {
	if (Object.keys(KEYBOARD_MAPPINGS).includes(ev.key))
		cube.applyMove(KEYBOARD_MAPPINGS[ev.key], 90);
});

const renderer = new THREE.WebGLRenderer({
	alpha: true,
	premultipliedAlpha: false,
	canvas: CANVAS,
});

const scene = new THREE.Scene();
const opponentScene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	50,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
const opponentCamera = new THREE.PerspectiveCamera(
	50,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const cube = new Cube();
const opponentCube = new Cube();
scene.add(cube);
opponentScene.add(opponentCube);

camera.position.x = 6;
camera.position.y = 7.5;

camera.lookAt(cube.position);

opponentCamera.position.x = 6;
opponentCamera.position.y = 7.5;
opponentCamera.lookAt(opponentCube.position);

function renderSceneInfo(elem, s, c) {
	// get the viewport relative position of this element
	const { left, right, top, bottom, width, height } =
		elem.getBoundingClientRect();

	c.aspect = width / height;
	c.updateProjectionMatrix();

	const positiveYUpBottom = renderer.domElement.clientHeight - bottom;
	renderer.setScissor(left, positiveYUpBottom, width, height);
	renderer.setViewport(left, positiveYUpBottom, width, height);

	renderer.render(s, c);
}

render();
function render() {
	renderer.setSize(window.innerWidth, window.innerHeight);

	renderer.setScissorTest(false);
	renderer.clear(true, true);
	renderer.setScissorTest(true);

	renderSceneInfo(document.getElementById("main-cube"), scene, camera);
	renderSceneInfo(
		document.getElementById("opponent-cube"),
		opponentScene,
		opponentCamera
	);
	TWEEN.update();

	requestAnimationFrame(render);
}

export function scramble(scram: String) {
	cube.applyMoves(scram.split(" ") as Move[], 0, 0);
}

export function applyMove() {}
