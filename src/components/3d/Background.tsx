import { range } from "@/utils/range";
import { Float } from "@react-three/drei";

const Background = () => {
  const columns = range(-10, 10, 2.5);
  const rows = range(-10, 10, 2.5);

  return (
    <group>
      <Float>
        {columns.map((col: number, i: number) =>
          rows.map((row: number, j: number) => (
            <mesh position={[col, row, -4]} key={i + j}>
              <icosahedronGeometry args={[0.12 - row * 0.01, 8]} />
              <meshStandardMaterial color="white" />
            </mesh>
          )),
        )}
      </Float>
    </group>
  );
};

export default Background;
