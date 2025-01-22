import { range } from "@/utils/range";
import { Float } from "@react-three/drei";
import { forwardRef } from "react";
import * as THREE from "three";

const Background = forwardRef<THREE.Group>((_, ref) => {
  const columns = range(-13, 13, 1.5);
  const rows = range(-13, 13, 1.5);

  return (
    <group ref={ref}>
      {/* <Float> */}
      {columns.map((col: number, i: number) =>
        rows.map((row: number, j: number) => (
          <mesh position={[col, row, -4]} key={i + j}>
            <icosahedronGeometry args={[0.12, 8]} />
            <meshStandardMaterial color="white" />
          </mesh>
        )),
      )}
      {/* </Float> */}
    </group>
  );
});

export default Background;
