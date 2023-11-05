import * as THREE from "three";
import { Cube, KEYBOARD_MAPPINGS, Move } from "./cube";
import * as TWEEN from "../tween";
import { scramble } from "cube-scramble.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	50,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const canvas = document.querySelector("#c") as HTMLCanvasElement;

canvas.addEventListener("keypress", (ev) => {
	if (Object.keys(KEYBOARD_MAPPINGS).includes(ev.key))
		cube.applyMove(KEYBOARD_MAPPINGS[ev.key], 90);
});

const renderer = new THREE.WebGLRenderer({
	alpha: true,
	premultipliedAlpha: false,
	canvas: canvas,
});

renderer.setSize(window.innerWidth, window.innerHeight);

const cube = new Cube();
scene.add(cube);

camera.position.x = 6;
camera.position.y = 7.5;

camera.lookAt(cube.position);

render();
function render() {
	const canvas = renderer.domElement;
	camera.aspect = canvas.clientWidth / canvas.clientHeight;
	camera.updateProjectionMatrix();

	requestAnimationFrame(render);

	TWEEN.update();

	renderer.render(scene, camera);
}

cube.applyMoves(scramble("3x3") as Move[], 0, 0);
