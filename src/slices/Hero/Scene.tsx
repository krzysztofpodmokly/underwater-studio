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
    if (!bubble1Ref.current || !bubble1GroupRef.current) return;

    gsap.set(bubble1Ref.current.position, { x: 0, y: 0, z: 0 });
    gsap.set(bubble1Ref.current.scale, { x: 0, y: 0, z: 0 });

    const introTl = gsap.timeline({
      defaults: {
        duration: 4,
        ease: "back.out(1.5)",
      },
    });

    introTl.to(bubble1Ref.current.scale, {
      x: 1.5,
      y: 1.5,
      z: 1.5,
    });

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

    scrollTl.to(bubble1Ref.current.scale, { x: 2, y: 2, z: 2 });
  });

  return (
    <>
      <group ref={bubble1GroupRef}>
        <Dispersion ref={bubble1Ref} />
      </group>

      <Text3d />
      <Environment preset="city" />
    </>
  );
};

export default Scene;
