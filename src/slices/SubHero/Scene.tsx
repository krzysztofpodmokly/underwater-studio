import {
  Environment,
  Float,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useControls } from "leva";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Distorted from "@/components/3d/distorted/Distorted";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Scene = () => {
  const group1Ref = useRef<THREE.Group>(null);
  const group2Ref = useRef<THREE.Group>(null);

  useGSAP(() => {
    if (!group1Ref.current || !group2Ref.current) return;

    gsap.set(group1Ref.current.position, { x: -2 });
    gsap.set(group2Ref.current.position, { x: 2 });
    gsap.set(group1Ref.current.scale, { x: 0.3, y: 0.3, z: 0.3 });
    gsap.set(group2Ref.current.scale, { x: 0.5, y: 0.5, z: 0.5 });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".sub-hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 4,
      },
    });

    scrollTl
      // .to(group1Ref.current.position, { x: -1 }, 2)
      .to(group1Ref.current.scale, { x: 1.1, y: 1.1, z: 1.1 })
      .to(group2Ref.current.scale, { x: 1, y: 1, z: 1 }, "-=0.3");
  });

  return (
    <group>
      <group ref={group1Ref}>
        <Distorted />
      </group>
      <group ref={group2Ref}>
        <Distorted />
      </group>
    </group>
  );
};

export default Scene;
