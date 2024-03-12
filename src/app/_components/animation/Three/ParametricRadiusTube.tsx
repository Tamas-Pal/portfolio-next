import { MeshTransmissionMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import rangeMap from '@/app/_components/animation/Three/rangeMap';
import helix from './helix';

interface HelixParams {
  path: THREE.CatmullRomCurve3;
  tubularSegments: number;
  radius: number;
  radialSegments: number;
  twirlCount: number;
}

const {
  path,
  tubularSegments,
  radius,
  radialSegments,
  twirlCount,
}: HelixParams = helix();

export function ParametricRadiusTube() {
  let time: number = 0;
  let timeMultiplier = 0.25;
  const frames = path.computeFrenetFrames(tubularSegments, false);

  // helper variables
  const vertex = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const uv = new THREE.Vector2();
  let P = new THREE.Vector3();

  const tubeNormals = useMemo(function generateNormals() {
    let P = new THREE.Vector3();
    const normals: number[] = [];

    for (let i = 0; i <= tubularSegments; i++) {
      P = path.getPointAt(i / tubularSegments, P);

      // vector perpendicular to tangent, but inside curvature plane
      const N = frames.normals[i];
      // perpendicular to tangent and curvature plane
      const B = frames.binormals[i];

      for (let j = 0; j <= radialSegments; j++) {
        const v = (j / radialSegments) * Math.PI * 2;

        const sin = Math.sin(v);
        const cos = -Math.cos(v);

        normal.x = cos * N.x + sin * B.x;
        normal.y = cos * N.y + sin * B.y;
        normal.z = cos * N.z + sin * B.z;
        normal.normalize();

        normals.push(normal.x, normal.y, normal.z);
      }
    }
    return new Float32Array(normals);
  }, []);

  const generateVertices = (array: Float32Array) => {
    const vertices: number[] = [];
    for (let i = 0; i <= tubularSegments; i++) {
      P = path.getPointAt(i / tubularSegments, P);

      const segmentRadius = calculateRadius(radius, i);
      for (let j = 0; j <= radialSegments; j++) {
        const veticePos = (i * (radialSegments + 1) + j) * 3;
        array[veticePos] = P.x + segmentRadius * tubeNormals[veticePos];
        array[veticePos + 1] = P.y + segmentRadius * tubeNormals[veticePos + 1];
        array[veticePos + 2] = P.z + segmentRadius * tubeNormals[veticePos + 2];
      }
    }

    function calculateRadius(radius: number, i: number) {
      const minRadius = 0.67;
      const segmentPosition = i / tubularSegments;

      // oscillating frequency of radius changes
      let bumpCount = (Math.sin(time) + 1) * 0.5 * twirlCount + twirlCount * 6;

      // normalized starting points for closing up the ends of tube
      const cutOffPoints = [0.175, 0.825];
      let cutOff = 1;
      if (segmentPosition < cutOffPoints[0]) {
        cutOff = segmentPosition * (1 / cutOffPoints[0]);
      } else if (segmentPosition > cutOffPoints[1]) {
        cutOff = (1 - segmentPosition) * (1 / (1 - cutOffPoints[1]));
      }
      return (
        ((Math.sin(
          ((Math.PI * i) / tubularSegments + Math.sin(time / twirlCount)) *
            bumpCount
        ) +
          1) *
          (1 - minRadius) +
          minRadius) *
        radius *
        cutOff
      );
    }
  };

  const tubePoints = new Float32Array(1323);
  generateVertices(tubePoints);

  const tubeUvs = useMemo(function generateUVs() {
    const uvs: number[] = [];
    for (let i = 0; i <= tubularSegments; i++) {
      for (let j = 0; j <= radialSegments; j++) {
        uv.x = i / tubularSegments;
        uv.y = j / radialSegments;

        uvs.push(uv.x, uv.y);
      }
    }
    return new Float32Array(uvs);
  }, []);

  const tubeIndices = useMemo(function generateIndices() {
    const indices: number[] = [];
    for (let j = 1; j <= tubularSegments; j++) {
      for (let i = 1; i <= radialSegments; i++) {
        const a = (radialSegments + 1) * (j - 1) + (i - 1);
        const b = (radialSegments + 1) * j + (i - 1);
        const c = (radialSegments + 1) * j + i;
        const d = (radialSegments + 1) * (j - 1) + i;

        // faces

        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }
    return new Uint16Array(indices);
  }, []);

  const meshRef = useRef<THREE.Mesh>(null!);
  const bufferRef = useRef<THREE.BufferAttribute>(null!);

  // radius and rotation changes each frame
  useFrame(({ clock }) => {
    time = clock.getElapsedTime() * timeMultiplier;
    generateVertices(bufferRef.current.array as Float32Array);
    bufferRef.current.needsUpdate = true;
    meshRef.current.rotation.x = rangeMap(
      Math.cos(time),
      -1,
      1,
      Math.PI * -0.33,
      Math.PI * 0.67
    );
  });

  const bgColor = new THREE.Color(0x0000e9);
  return (
    <>
      <mesh ref={meshRef} position={[0.025, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach='attributes-position'
            array={tubePoints}
            count={tubePoints.length / 3}
            itemSize={3}
            ref={bufferRef}
          />
          <bufferAttribute
            attach='attributes-uv'
            array={tubeUvs}
            count={tubeUvs.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach='attributes-normal'
            array={tubeNormals}
            count={tubeNormals.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach='index'
            array={tubeIndices}
            count={tubeIndices.length}
            itemSize={1}
          />
        </bufferGeometry>
        <MeshTransmissionMaterial
          background={bgColor}
          backside={false}
          samples={24}
          resolution={32}
          transmission={1.0}
          roughness={1.0}
          clearcoat={0.0}
          clearcoatRoughness={0.0}
          thickness={0.075}
          backsideThickness={0.0}
          ior={5.0}
          chromaticAberration={0}
          anisotropy={0}
          distortion={1.0}
          distortionScale={0.8}
          temporalDistortion={0.1}
          attenuationDistance={1.1}
          attenuationColor='#ffffff'
          color='#fff'
          toneMapped={false}
        />
        <meshBasicMaterial color={bgColor} toneMapped={false} />
      </mesh>
    </>
  );
}
