"use client";

import { Environment } from "@react-three/drei";

import Dispersion from "@/components/3d/disperion/Dispersion";
import { useRef } from "react";
import { Group } from "three";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Text3d from "./Text3d";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Scene = () => {
  const bubble1Ref = useRef<Group>(null);
  const bubble2Ref = useRef<Group>(null);

  const bubble1GroupRef = useRef<Group>(null);
  const bubble2GroupRef = useRef<Group>(null);

  const bubbleConfig = {
    positionFrequency: 0.15,
    timeFrequency: 0.25,
    strength: 0.15,
    warpPositionFrequency: 1.3,
    warpTimeFrequency: 0.4,
    warpStrength: 0.6,
    light: { x: -8, y: -15, z: 1 },
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
      !bubble2Ref.current ||
      !bubble1GroupRef.current ||
      !bubble2GroupRef.current
    )
      return;

    gsap.set(bubble1Ref.current.position, { x: 0, y: 0, z: 0 });
    gsap.set(bubble2Ref.current.position, { x: -1, y: -5, z: -5 });
    gsap.set(bubble1GroupRef.current.scale, { x: 2, y: 2, z: 2 });
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
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    scrollTl
      .to(bubble1Ref.current.scale, { x: 0.3, y: 0.3, z: 0.3 }, 1.3)
      .to(bubble1Ref.current.position, { x: 0.8, y: -0.3, z: 0 }, "<")
      .to(bubble2Ref.current.position, { x: 0, y: 0.1, z: 0 }, "<")
      .to(bubble2Ref.current.scale, { x: 2, y: 2, z: 2 }, "<");
  });

  return (
    <>
      <group position={[0, 0, 1]}>
        <group ref={bubble1GroupRef}>
          <Dispersion ref={bubble1Ref} {...bubbleConfig} name="primary" />
        </group>
        <group ref={bubble2GroupRef}>
          <Dispersion ref={bubble2Ref} {...bubbleConfig2} name="secondary" />
        </group>
      </group>

      <Environment preset="city" />
      <Text3d />
    </>
  );
};

export default Scene;
