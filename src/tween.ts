import { clamp } from "three/src/math/MathUtils";
import { Cubie } from "./cube";

export let tweeners: tweener[] = [];

interface tweener {
	cubie: Cubie;
	startTime: Date;
	duration: number;
	axis: THREE.Vector3;
	angle: number;
	lastAngle?: number;
}

export function Tween(
	cubie: Cubie,
	duration: number,
	axis: THREE.Vector3,
	angle: number
) {
	tweeners.push({
		cubie: cubie,
		duration: duration,
		axis: axis,
		angle: angle,
		startTime: new Date(),
	});
}

export function update() {
	let i = 0;
	for (const tw of tweeners) {
		i++;
		// t is a number between 0 and 1
		let t =
			clamp(new Date().getTime() - tw.startTime.getTime(), 0, tw.duration) /
			tw.duration;
		// ease t
		t = easeInQuad(t);
		const angle = tw.angle * t;

		tw.cubie.rotateOnWorldAxis(tw.axis, tw.lastAngle ?? 0);
		tw.cubie.rotateOnWorldAxis(tw.axis, angle);

		tw.lastAngle = -angle;
		if (t == 1) {
			tweeners = tweeners.filter((_, j) => i == j);
		}
	}
}

export function resolve() {
	for (const tw of tweeners) {
		tw.cubie.rotateOnWorldAxis(tw.axis, tw.lastAngle ?? 0);
		tw.cubie.rotateOnWorldAxis(tw.axis, tw.angle);
	}
	tweeners = [];
}

function easeInQuad(x: number): number {
	return x;
}
