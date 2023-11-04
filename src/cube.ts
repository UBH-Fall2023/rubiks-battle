import * as THREE from "three";

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

export type FaceColor = "w" | "y" | "o" | "r" | "g" | "b";

export class Cube extends THREE.Object3D {
	public constructor() {
		super();
		let i = 0;
		for (let z = -1; z <= 1; z++) {
			for (let x = -1; x <= 1; x++) {
				for (let y = -1; y <= 1; y++) {
					if(CUBIES[i] != "S") {
						
						const cubie = this.createCubie(CUBIES[i].split("") as FaceColor[], new THREE.Vector3(x, y, z))
						this.add(cubie)
						console.log(CUBIES[i]);
					}
					i++;

				}

			}
		}
	}

	private createCubie(
		faces: FaceColor[],
		offset: THREE.Vector3
	): THREE.Object3D {
		offset.multiplyScalar(Math.sqrt(CUBIE_SIZE * CUBIE_SIZE * 2));
		const cubie = new THREE.Object3D();
		for (const faceColor of faces) {
			const geometry = new THREE.PlaneGeometry(CUBIE_SIZE, CUBIE_SIZE);
			const material = new THREE.MeshBasicMaterial({
				color: CUBIE_COLORS[faceColor],
				side: THREE.DoubleSide,
			});

			const face = new THREE.Mesh(geometry, material);
			const position = FACE_OFFSETS[faceColor];
			face.position.set(position[0], position[1], position[2])
			face.position.multiplyScalar(CUBIE_SIZE / 2 + 0.05);
			face.position.add(offset);
			cubie.add(face);

			face.lookAt(new THREE.Vector3().addVectors(cubie.position, offset));
		}
		return cubie;
	}
}
