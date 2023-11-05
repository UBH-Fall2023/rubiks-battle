// -------------------------------------------------------------------------
//
// this entire file sucks to read
// this is the ugliest code ive written but its 5am so i do not care
//
// -------------------------------------------------------------------------

import { clamp } from "three/src/math/MathUtils";
import { Cubie } from "./three/cube";

export let tweeners: {"self": tweener[], "opponent": tweener[]} = {"self": [], "opponent": []};

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
	angle: number,
  user: "self" | "opponent"
) {
	tweeners[user].push({
		cubies: cubies,
		duration: duration,
		axis: axis,
		angle: angle, 

	});
}

export function update() {
  for (let tweener of Object.values(tweeners)) {
    if (tweener.length == 0) {
      continue;
    }
    const tw = tweener[0];
    if (!tw.startTime) tw.startTime = performance.now()
    // t is a number between 0 and 1
    let t = clamp((performance.now() - tw.startTime) / tw.duration, 0, 1);
    if (tweener.length > 2) t = 1;
    const angle = tw.angle * t;
    for (const cubie of tw.cubies) {
      cubie.rotateOnWorldAxis(tw.axis, angle);
      cubie.rotateOnWorldAxis(tw.axis, tw.lastAngle ?? 0);
    }
    
    tw.lastAngle = -angle;
    if (t == 1) {
      tweener.shift()
    }
  }
}
