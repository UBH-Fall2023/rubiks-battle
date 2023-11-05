import * as THREE from "three";
import { Cube, Cubie, KEYBOARD_MAPPINGS, Move } from "./cube";
import * as TWEEN from "../tween";
import { writeTurn } from "../index";

const CANVAS = document.querySelector("#c") as HTMLCanvasElement;

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

let cube = new Cube("self");
let opponentCube = new Cube("opponent");
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

export function solve() {
	(scene as THREE.Scene).remove(cube);
	cube = new Cube("self");
	scene.add(cube);
}

export function scramble(scram: String) {
	(scene as THREE.Scene).remove(cube);
	cube = new Cube("self");
	scene.add(cube);

	(opponentScene as THREE.Scene).remove(opponentCube);
	opponentCube = new Cube("opponent");
	opponentScene.add(opponentCube);
	cube.applyMoves(scram.split(" ") as Move[], 0, 0);
	opponentCube.applyMoves(scram.split(" ") as Move[], 0, 0);
}

export function checkSolved() {
	const vec = new THREE.Vector3(1, 1, 1)
	const c = (cube.children as Cubie[])[0] 
	vec.applyEuler(c.rotation)

	let solved = true;

	for (const cubie of cube.children as Cubie[]) {
		const newVec = new THREE.Vector3(1, 1, 1)
		newVec.applyEuler(cubie.rotation)

		if (!vec.equals(newVec)) solved = false;
	}
	console.log(solved);
}

export function applyMove(moves: Move[]) {
	opponentCube.applyMoves(moves, 130, 90);
}

CANVAS.addEventListener("keypress", (ev) => {
	if (Object.keys(KEYBOARD_MAPPINGS).includes(ev.key))
		cube.applyMove(KEYBOARD_MAPPINGS[ev.key], 90);
	writeTurn(KEYBOARD_MAPPINGS[ev.key]);
});
