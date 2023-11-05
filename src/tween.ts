import { clamp } from "three/src/math/MathUtils";
import { Cubie } from "./three/cube";

export let tweeners: tweener[] = [];

interface tweener {
	cubies: Cubie[];
	startTime?: number;
	duration: number;
	axis: THREE.Vector3;
	angle: number;
	lastAngle?: number;
}

export function Tween(
	cubies: Cubie[],
	duration: number,
	axis: THREE.Vector3,
	angle: number
) {
	tweeners.push({
		cubies: cubies,
		duration: duration,
		axis: axis,
		angle: angle, 

	});
}

export function update() {
  if (tweeners.length == 0) {
    return;
  }
	const tw = tweeners[0];
  if (!tw.startTime) tw.startTime = performance.now()
	// t is a number between 0 and 1
	let t = clamp((performance.now() - tw.startTime) / tw.duration, 0, 1);
  if (tweeners.length > 2) t = 1;
	const angle = tw.angle * t;
  for (const cubie of tw.cubies) {
    cubie.rotateOnWorldAxis(tw.axis, angle);
    cubie.rotateOnWorldAxis(tw.axis, tw.lastAngle ?? 0);
  }
  
  tweeners[0].lastAngle = -angle;
	if (t == 1) {
		tweeners.shift()
	}
}
