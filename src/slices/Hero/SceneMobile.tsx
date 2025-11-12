"use client";

import { Environment } from "@react-three/drei";

import Dispersion from "@/components/3d/disperion/Dispersion";
import { useRef } from "react";
import * as THREE from "three";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SceneMobile = () => {
  const bubble1Ref = useRef<THREE.Group>(null);
  const bubble2Ref = useRef<THREE.Group>(null);

  const bubble1GroupRef = useRef<THREE.Group>(null);
  const bubble2GroupRef = useRef<THREE.Group>(null);

  const bubbleConfig = {
    positionFrequency: 0.2,
    timeFrequency: 0.3,
    strength: 0.1,
    warpPositionFrequency: 1.1,
    warpTimeFrequency: -0.4,
    warpStrength: -0.6,
    light: { x: -8, y: -15, z: 1 },
  };

  const bubbleConfig2 = {
    positionFrequency: 0.3,
    timeFrequency: 0.2,
    strength: 0.14,
    warpPositionFrequency: 1.2,
    warpTimeFrequency: 0.35,
    warpStrength: 0.4,
  };

  useGSAP(() => {
    if (
      !bubble1Ref.current ||
      !bubble2Ref.current ||
      !bubble1GroupRef.current ||
      !bubble2GroupRef.current
    )
      return;

    gsap.set(bubble1Ref.current.position, { x: -0.1, y: 0, z: 0 });
    gsap.set(bubble2Ref.current.position, { x: -0.5, y: -2.5, z: -2.5 });
    gsap.set(bubble1GroupRef.current.scale, { x: 1.5, y: 1.5, z: 1.5 });
    gsap.set(bubble2GroupRef.current.position, { x: 0, y: 0, z: 0 });

    if (window.scrollY < 20) {
      const introTl = gsap.timeline({
        defaults: {
          duration: 4,
          ease: "back.out(1.5)",
        },
      });

      introTl.from(bubble1GroupRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
      });
    }

    const scrollTl = gsap.timeline({
      defaults: {
        duration: 2,
      },
      scrollTrigger: {
        trigger: ".hero",
        start: "50% bottom",
        end: "bottom 30%",
        scrub: 1.5,
      },
    });

    scrollTl
      .to(bubble1Ref.current.scale, { x: 0.5, y: 0.5, z: 0.5 }, 1.3)
      .to(bubble1Ref.current.position, { x: 0.8, y: -0.3, z: 0 }, "<")
      .to(bubble2Ref.current.position, { x: 0, y: 0.1, z: 0 }, "<")
      .to(bubble2Ref.current.scale, { x: 1.5, y: 1.5, z: 1.5 }, "<");
  });

  return (
    <>
      <fog attach="fog" args={["#001011", 2, 15]} />
      <group position={[0, 0, 1]}>
        <group ref={bubble1GroupRef}>
          <Dispersion ref={bubble1Ref} {...bubbleConfig} name="primary" />
        </group>
        <group ref={bubble2GroupRef}>
          <Dispersion ref={bubble2Ref} {...bubbleConfig2} name="secondary" />
        </group>
      </group>

      <Environment preset="city" />
    </>
  );
};

export default SceneMobile;
