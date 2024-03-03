import * as THREE from 'three';

export default function helix() {
  const twirlCount = 1.5;
  const helixLength = 3.5;
  const helixRadius = 0.4;
  const pointCount = twirlCount * 8;
  const stepsPerTwirl = twirlCount / pointCount;
  const tubeRadius = 0.125;
  const axialSegments = pointCount;
  const radialSegments = 4;

  const helixPoints: THREE.Vector3[] = [];

  for (let i = 0; i < pointCount; i++) {
    helixPoints.push(
      new THREE.Vector3(
        (i / pointCount - 0.5) * helixLength,
        Math.sin(i * stepsPerTwirl * Math.PI) * helixRadius,
        Math.cos(i * stepsPerTwirl * Math.PI) * helixRadius
      )
    );
  }

  const helixCurve = new THREE.CatmullRomCurve3(
    helixPoints,
    false,
    'catmullrom',
    0.5
  );

  return {
    path: helixCurve,
    tubularSegments: axialSegments,
    radius: tubeRadius,
    radialSegments: radialSegments,
    twirlCount: twirlCount,
  };
}
