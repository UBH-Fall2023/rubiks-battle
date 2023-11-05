import * as THREE from "three";
import * as TWEEN from "../tween";
import { degToRad } from "three/src/math/MathUtils";

const CUBIE_SIZE = 1;
const CUBIE_COLORS = {
	w: "#E6EBEE",
	y: "#FFFF64",
	g: "#02BE02",
	b: "#127FE6",
	r: "#BE1010",
	o: "#D89211",
};
const FACE_OFFSETS = {
	w: [0, 1, 0],
	y: [0, -1, 0],
	g: [1, 0, 0],
	b: [-1, 0, 0],
	r: [0, 0, -1],
	o: [0, 0, 1],
};
const CUBIES = [
	"ybo",
	"yb",
	"ybr",
	"yo",
	"y",
	"yr",
	"ygo",
	"yg",
	"ygr",
	"ob",
	"b",
	"br",
	"o",
	"S",
	"r",
	"og",
	"g",
	"gr",
	"wbo",
	"wb",
	"wbr",
	"wo",
	"w",
	"wr",
	"wgo",
	"wg",
	"wgr",
];
const AXES = {
	x: new THREE.Vector3(1, 0, 0),
	y: new THREE.Vector3(0, 1, 0),
	z: new THREE.Vector3(0, 0, 1),
};
const MOVES = {
	// Normal Moves
	R: { axis: "z", selector: (el) => el.offset.z < 0, rotation: 1 },
	L: { axis: "z", selector: (el) => el.offset.z > 0, rotation: -1 },
	F: { axis: "x", selector: (el) => el.offset.x > 0, rotation: -1 },
	B: { axis: "x", selector: (el) => el.offset.x < 0, rotation: 1 },
	U: { axis: "y", selector: (el) => el.offset.y > 0, rotation: -1 },
	D: { axis: "y", selector: (el) => el.offset.y < 0, rotation: 1 },
	// Fat moves
	r: { axis: "z", selector: (el) => el.offset.z <= 0, rotation: 1 },
	l: { axis: "z", selector: (el) => el.offset.z >= 0, rotation: -1 },
	f: { axis: "x", selector: (el) => el.offset.x >= 0, rotation: -1 },
	b: { axis: "x", selector: (el) => el.offset.x <= 0, rotation: 1 },
	u: { axis: "y", selector: (el) => el.offset.y >= 0, rotation: -1 },
	d: { axis: "y", selector: (el) => el.offset.y <= 0, rotation: 1 },
	// Slice moves
	E: { axis: "y", selector: (el) => el.offset.y == 0, rotation: 1 },
	M: { axis: "z", selector: (el) => el.offset.z == 0, rotation: -1 },
	S: { axis: "x", selector: (el) => el.offset.x == 0, rotation: 1 },
	// Rotations
	y: { axis: "y", selector: (el) => true, rotation: 1 },
	z: { axis: "z", selector: (el) => true, rotation: -1 },
	x: { axis: "x", selector: (el) => true, rotation: 1 },
};
export const KEYBOARD_MAPPINGS = {
	i: "R",
	k: "R'",
	d: "L",
	e: "L'",
	g: "F'",
	h: "F",
	o: "B'",
	w: "B",
	j: "U",
	f: "U'",
	s: "D",
	l: "D'",
	"5": "M",
	x: "M'",
	u: "r",
	m: "r'",
	r: "l'",
	v: "l",
	z: "d",
	c: "u'",
	",": "u",
	y: "z'",
	n: "z",
	a: "y",
	";": "y'",
	q: "x",
	p: "x'",
};

export interface MoveData {
	axis: "x" | "y" | "z";
	selector: (_: Cubie) => boolean;
	rotation: number;
}
export type Move = `${keyof typeof MOVES}${"'" | "" | "2"}`;
export type FaceColor = "w" | "y" | "o" | "r" | "g" | "b";

function wait(time) {
	return new Promise((resolve) => {
		setTimeout(resolve, time);
	});
}

export class Cube extends THREE.Object3D {
	public readonly user: "self" | "opponent";

	public constructor(user: "self" | "opponent") {
		super();
		this.user = user;
		let i = 0;
		for (let y = -1; y <= 1; y++) {
			for (let x = -1; x <= 1; x++) {
				for (let z = 1; z >= -1; z--) {
					if (CUBIES[i] != "S") {
						const cubie = new Cubie(
							CUBIES[i].split("") as FaceColor[],
							new THREE.Vector3(x, y, z)
						);
						this.add(cubie);
					}
					i++;
				}
			}
		}
	}

	public applyMove(move: Move, duration: number) {
		const moveData = MOVES[move[0]];
		// if move has ' rotate opposite way, if move has "2" rotate twice
		const deg =
			moveData.rotation *
			(Math.PI / 2) *
			(move.endsWith("'") ? -1 : 1) *
			(move.endsWith("2") ? 2 : 1);

		const ax = AXES[moveData.axis];
		if (duration != 0) {
			TWEEN.Tween(
				this.children.filter(moveData.selector) as Cubie[],
				duration,
				ax,
				deg,
				this.user
			);
		}
		(this.children as Cubie[]).filter(moveData.selector).forEach((cubie) => {
			cubie.offset.applyAxisAngle(ax, deg);
			cubie.offset.round();

			if (duration == 0) {
				cubie.rotateOnWorldAxis(ax, deg);
			}
		});
	}

	public async applyMoves(
		moves: Move[],
		delay: number = 300,
		duration: number = 200
	) {
		for (const move of moves) {
      if (move == undefined) continue;
			this.applyMove(move, duration);
			if (delay != 0) {
				await wait(delay);
			}
		}
	}
}

export class Cubie extends THREE.Object3D {
	public offset: THREE.Vector3;
	public faces: FaceColor[];

	public constructor(faces: FaceColor[], offset: THREE.Vector3) {
		super();
		// set this.offset to normalized offset
		// (its not actually normalized i mean all its coords are 1 or 0 i forgot what this is called tho)
		this.offset = new THREE.Vector3().copy(offset);
		this.faces = faces;

		offset.multiplyScalar(Math.sqrt(CUBIE_SIZE * CUBIE_SIZE + 0.5));
		for (const faceColor of faces) {
			const geometry = new THREE.PlaneGeometry(CUBIE_SIZE, CUBIE_SIZE);
			const material = new THREE.MeshBasicMaterial({
				color: CUBIE_COLORS[faceColor],
				side: THREE.DoubleSide,
			});

			const face = new THREE.Mesh(geometry, material);
			const position = FACE_OFFSETS[faceColor];
			face.position.set(position[0], position[1], position[2]);
			face.position.multiplyScalar(CUBIE_SIZE / 2 + 0.05);
			face.position.add(offset);
			this.add(face);
			face.lookAt(new THREE.Vector3().addVectors(this.position, offset));
		}
	}
}
