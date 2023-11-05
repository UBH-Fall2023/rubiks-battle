import * as THREE from "three";
import { Cube, KEYBOARD_MAPPINGS, Move } from "./cube";
import * as TWEEN from './tween.ts'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	100,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cube = new Cube();
scene.add(cube);

camera.position.x = 4
camera.position.y = 4

camera.lookAt(cube.position)

render();
const Clock = new THREE.Clock()
function render() {
	requestAnimationFrame(render);

	TWEEN.update()
	
	renderer.render(scene, camera);
}

cube.applyMoves("D2 B R2 F2 U2 R2 U2 B' D2 U2 L2 U2 L D' U B L' F' U2 F2 R2".split(" ") as Move[], 0, 0)

document.addEventListener("keypress", (ev) => {
	if (Object.keys(KEYBOARD_MAPPINGS).includes(ev.key))
	cube.applyMove(KEYBOARD_MAPPINGS[ev.key], 100)
})