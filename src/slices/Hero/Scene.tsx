"use client";

import { Environment, OrbitControls } from "@react-three/drei";

import Dispersion from "@/components/3d/Dispersion";
import Background from "@/components/3d/Background";
import { useRef } from "react";
import { Group, Mesh } from "three";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Text3d from "./Text3d";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Scene = () => {
  const bubblesRef = useRef<Group>(null);
  const bubble1Ref = useRef<Group>(null);
  const bubble2Ref = useRef<Group>(null);
  const bubble3Ref = useRef<Group>(null);

  const bubble1GroupRef = useRef<Group>(null);
  const bubble2GroupRef = useRef<Group>(null);

  const word1Ref = useRef<Mesh>(null);
  const word2Ref = useRef<Mesh>(null);
  const word3Ref = useRef<Mesh>(null);
  const word4Ref = useRef<Mesh>(null);

  const wordsGroupRef = useRef<Group>(null);
  const wordGroup1Ref = useRef<Group>(null);

  const bubbleConfig = {
    positionFrequency: 0.15,
    timeFrequency: 0.25,
    strength: 0.15,
    warpPositionFrequency: 1.3,
    warpTimeFrequency: 0.4,
    warpStrength: 0.6,
  };

  const bubbleConfig2 = {
    positionFrequency: 0.35,
    timeFrequency: 0.25,
    strength: 0.15,
    warpPositionFrequency: 1.3,
    warpTimeFrequency: 0.4,
    warpStrength: 0.6,
  };

  useGSAP(() => {
    if (
      !bubble1Ref.current ||
      !bubble1GroupRef.current
      // !bubble3Ref.current ||
      // !wordsGroupRef.current ||
      // !word1Ref.current ||
      // !word2Ref.current ||
      // !word3Ref.current ||
      // !word4Ref.current ||
      // !wordGroup1Ref.current
    )
      return;

    gsap.set(bubble1Ref.current.position, { x: 0, y: 0, z: 0 });
    gsap.set(bubble1Ref.current.scale, { x: 0, y: 0, z: 0 });
    // gsap.set(bubble1GroupRef.current.scale, { x: 0, y: 0, z: 0 });

    // gsap.set(bubble3Ref.current.position, { x: -5, y: 0, z: 0 });

    // gsap.set(word1Ref.current.position, { x: 10, y: 3, z: -10 });
    // gsap.set(word2Ref.current.position, { x: -2, z: -2 });
    // gsap.set(word3Ref.current.position, { x: -2, y: -6, z: -10 });
    // gsap.set(word4Ref.current.position, { x: 2.2, y: 0, z: -2 });

    const introTl = gsap.timeline({
      defaults: {
        duration: 4,
        ease: "back.out(1.5)",
      },
    });

    introTl.to(bubble1Ref.current.scale, {
      x: 1,
      y: 1,
      z: 1,
    });
    //   .to(word1Ref.current.position, { x: -1, y: 2 }, 0);
    // .from(word1Ref.current.rotation, { z: 1 }, 0)
    // .from(word2Ref.current.position, { x: -2, y: 3 }, 0)
    // .from(word2Ref.current.rotation, { z: 1.3 }, 0)
    // .from(word3Ref.current.position, { x: 2, y: -3 }, 0)
    // .from(word3Ref.current.rotation, { z: 0.5 }, 0)
    // .from(word4Ref.current.position, { x: -4, y: -5 }, 0)
    // .from(word4Ref.current.rotation, { z: 2 }, 0);

    const scrollTl = gsap.timeline({
      defaults: {
        duration: 2,
      },
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    // scrollTl
    //   .to(bubble1Ref.current.scale, { x: 2, y: 2, z: 2 })
    //   .to(word1Ref.current.position, { x: -2, y: 0, z: -2 }, 0)
    //   .to(word2Ref.current.position, { x: 2, y: 0, z: -2 }, 0)
    //   .to(word3Ref.current.position, { x: 0.5, y: 0, z: -2 }, 0)
    //   .to(word4Ref.current.position, { x: -0.7, y: 0, z: -2 }, 0);
  });

  return (
    <>
      <group ref={bubble1GroupRef}>
        <Dispersion ref={bubble1Ref} />
      </group>
      {/* <Dispersion ref={bubble2Ref} /> */}
      {/* <Dispersion ref={bubble3Ref} /> */}

      {/* <group ref={groupRef}>
        <group ref={bubble1GroupRef}>
          <Dispersion ref={bubble1Ref} name="bubble-1" {...bubbleConfig} />
        </group>
        <group ref={bubble2GroupRef}>
          <Dispersion name="bubble-2" ref={bubble2Ref} {...bubbleConfig2} />
        </group>

        <OrbitControls />
      </group> */}
      {/* <OrbitControls /> */}
      <Text3d />
      <Environment preset="city" />
      {/* <group ref={wordsGroupRef}>
        <group ref={wordGroup1Ref}>
          <mesh rotation={[0.3, 0.2, 0]} ref={word1Ref}>
            <boxGeometry />
            <meshStandardMaterial color="green" />
          </mesh>
        </group>
        <mesh rotation={[0.3, 0.2, 0]} ref={word2Ref}>
          <boxGeometry />
          <meshStandardMaterial color={"blue"} />
        </mesh>
        <mesh rotation={[0.3, 0.2, 0]} ref={word3Ref}>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
        <mesh rotation={[0.3, 0.2, 0]} ref={word4Ref}>
          <boxGeometry />
          <meshStandardMaterial color={"red"} />
        </mesh>
      </group> */}

      {/* <Background /> */}
    </>
  );
};

export default Scene;
