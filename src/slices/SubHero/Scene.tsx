import {
  Environment,
  Float,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useControls } from "leva";

const Scene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 1 * delta;
      groupRef.current.rotation.z += 0.5 * delta;
    }
  });

  const config = useControls({
    transmisionSampler: true,
    backside: true,
    samples: { value: 10, min: 1, max: 32, step: 1 },
    resolution: { value: 2048, min: 256, max: 2048, step: 256 },
    transmission: { value: 1, min: 0, max: 1 },
    roughness: { value: 0.1, min: 0, max: 1, step: 0.01 },
    thickness: { value: 2.75, min: 0, max: 10, step: 0.01 },
    ior: { value: 1.85, min: 1, max: 5, step: 0.01 },
    chromaticAberration: { value: 0.36, min: 0, max: 1 },
    anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.2, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.92, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.21, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 0.01, min: 0, max: 1 },
    attenuationDistance: { value: 1, min: 0, max: 10, step: 0.01 },
    // attenuationColor: "#fff",
    // color: "#fff",
  });

  return (
    <Float speed={5} rotationIntensity={1} floatIntensity={2}>
      <group>
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshTransmissionMaterial {...config} />
        </mesh>

        <group ref={groupRef}>
          <Environment preset="city" />
          <mesh position={[0, 0, 0.25]}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color="#001011" />
          </mesh>
          <mesh position={[-0.2, 0, -0.12]}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color="#fe9000" />
          </mesh>
          <mesh position={[0.2, 0, -0.12]}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color="#97c8eb" />
          </mesh>
        </group>
      </group>
    </Float>
  );
};

export default Scene;
