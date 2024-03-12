'use client';

import { Center, FontData, Text3D } from '@react-three/drei';
//import { Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import font from './font.json';
import { ParametricRadiusTube } from './ParametricRadiusTube';

export default function Three() {
  return (
    <Canvas camera={{ fov: 14 }}>
      {/* <Stats /> */}
      <ParametricRadiusTube />
      <Center>
        <Text3D
          font={font as unknown as FontData}
          scale={[0.35, 0.35, 0.35]}
          position={[-0.1, 0.1, 0]}
        >
          TAMÁS PÁL
          <meshBasicMaterial color={0xf1f5f9} toneMapped={false} />
        </Text3D>
      </Center>
    </Canvas>
  );
}