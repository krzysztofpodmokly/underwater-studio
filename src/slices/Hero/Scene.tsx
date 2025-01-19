"use client";

import { Environment, OrbitControls } from "@react-three/drei";

import Dispersion from "@/components/3d/Dispersion";
import Background from "@/components/3d/Background";
import { useRef } from "react";
import { Group } from "three";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {};

const Scene = (props: Props) => {
  const bubble1Ref = useRef<Group>(null);
  const bubble2Ref = useRef<Group>(null);

  const bubble1GroupRef = useRef<Group>(null);
  const bubble2GroupRef = useRef<Group>(null);

  const groupRef = useRef<Group>(null);

  useGSAP(() => {
    if (
      !bubble1Ref.current ||
      !bubble2Ref.current ||
      !bubble1GroupRef.current ||
      !bubble2GroupRef.current ||
      !groupRef.current
    )
      return;

    // Set bubble starting location
    gsap.set(bubble1Ref.current.position, { x: -2, y: 2 });
    gsap.set(bubble1Ref.current.scale, { x: 2, y: 2, z: 2 });
    gsap.set(bubble2Ref.current.position, { x: 2 });

    const introTl = gsap.timeline({
      defaults: {
        duration: 3,
        ease: "back.out(1.4)",
      },
    });

    // Play animation if a user scrolled
    if (window.scrollY < 20) {
      introTl.from(bubble1GroupRef.current.position, { y: -5, x: 1 }, 0);
      introTl.from(bubble2GroupRef.current.position, { y: 5, x: 1 }, 0);
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
      .to(groupRef.current.rotation, {
        y: Math.PI,
      })
      .to(
        bubble1Ref.current.position,
        {
          y: 2,
        },
        "<",
      )
      .to(
        groupRef.current.position,
        {
          x: 3,
          duration: 3,
          ease: "sine.inOut",
        },
        1.3,
      );
  });

  return (
    <>
      <group ref={groupRef}>
        <group ref={bubble1GroupRef}>
          <Dispersion ref={bubble1Ref} />
        </group>
        <group ref={bubble2GroupRef}>
          <Dispersion ref={bubble2Ref} />
        </group>
        {/* <OrbitControls /> */}
      </group>
      <Environment preset="city" />
      <Background />
    </>
  );
};

export default Scene;
