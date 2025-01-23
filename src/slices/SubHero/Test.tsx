"use client";

import Dispersion from "@/components/3d/disperion/Dispersion";
import { OrbitControls, Sparkles, Text } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Background from "@/components/3d/Background";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  sentence: string | null;
};

const Scene = ({ sentence }: Props) => {
  const groupRef = useRef<THREE.Group>(null);
  const bubbleRef = useRef<THREE.Group>(null);
  const sparkles1Ref = useRef<THREE.Points>(null);
  const sparkles2Ref = useRef<THREE.Points>(null);
  const sparklesRef = useRef<THREE.Group>(null);
  const wordsRef = useRef<THREE.Group>(null);

  const ANGLE = 90 * (Math.PI / 180);

  const getXPosition = (distance: number) => distance * Math.cos(ANGLE);
  const getYPosition = (distance: number) => distance * Math.sin(ANGLE);
  const getXYPositions = (distance: number) => ({
    x: getXPosition(distance),
    y: getYPosition(-1 * distance),
  });

  useGSAP(() => {
    if (
      !bubbleRef.current ||
      !groupRef.current ||
      !sparkles1Ref.current ||
      !sparkles2Ref.current ||
      !sparklesRef.current ||
      !wordsRef.current
    )
      return;

    gsap.set(sparklesRef.current.position, { z: -5 });
    gsap.set(bubbleRef.current.position, { ...getXYPositions(-4) });
    gsap.set(
      wordsRef.current.children.map((word) => word.position),
      { ...getXYPositions(7), z: 2 },
    );

    // Infinite sparkles movement
    const DISTANCE = 15;
    const DURATION = 6;
    gsap.set([sparkles1Ref.current.position, sparkles2Ref.current.position], {
      ...getXYPositions(DISTANCE),
    });

    gsap.to(sparkles1Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * 2)}`,
      x: `+=${getXPosition(DISTANCE * -2)}`,
      ease: "none",
      repeat: -1,
      duration: DURATION,
    });
    gsap.to(sparkles2Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * 2)}`,
      x: `+=${getXPosition(DISTANCE * -2)}`,
      ease: "none",
      repeat: -1,
      delay: DURATION / 2,
      duration: DURATION,
    });
  });

  return (
    <group ref={groupRef}>
      <Dispersion ref={bubbleRef} />

      <group ref={sparklesRef}>
        <Sparkles
          count={100}
          size={10}
          ref={sparkles1Ref}
          scale={[20, 20, 20]}
          rotation={[0, 0, Math.PI / -4]}
        />
        <Sparkles
          count={100}
          size={10}
          ref={sparkles2Ref}
          scale={[20, 20, 20]}
          rotation={[0, 0, Math.PI / -4]}
          color="red"
        />
      </group>

      <group ref={wordsRef}>
        {sentence && <ThreeText sentence={sentence} />}
      </group>

      {/* <OrbitControls /> */}
    </group>
  );
};

export default Scene;

const ThreeText = ({
  sentence,
  color,
}: {
  sentence: string;
  color?: string;
}) => {
  const words = sentence.toUpperCase().split(" ");
  const material = new THREE.MeshLambertMaterial();
  return words.map((word, index) => (
    <Text
      key={`${word}-${index}`}
      material={material}
      color={color}
      anchorX="center"
      anchorY="middle"
      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!,.?"
    >
      {word}
    </Text>
  ));
};
