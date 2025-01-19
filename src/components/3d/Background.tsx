import { range } from "@/utils/range";

const Background = () => {
  const columns = range(-7.5, 7.5, 2.5);
  const rows = range(-7.5, 7.5, 2.5);

  return (
    <group>
      {columns.map((col: number, i: number) =>
        rows.map((row: number, j: number) => (
          <mesh position={[col, row, -4]} key={i + j}>
            <icosahedronGeometry args={[0.333, 8]} />
            <meshStandardMaterial color="white" />
          </mesh>
        )),
      )}
    </group>
  );
};

export default Background;
