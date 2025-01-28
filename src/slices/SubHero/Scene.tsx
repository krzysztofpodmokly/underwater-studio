import * as THREE from "three";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Distorted from "@/components/3d/distorted/Distorted";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Scene = () => {
  const group1Ref = useRef<THREE.Group>(null);
  const group2Ref = useRef<THREE.Group>(null);
  const containerRef = useRef<THREE.Group>(null);

  useGSAP(() => {
    if (!group1Ref.current || !group2Ref.current) return;

    gsap.set(group1Ref.current.position, { x: -1.8, y: -0.6 });
    gsap.set(group2Ref.current.position, { x: 2.0, y: 0.3 });
    gsap.set(group1Ref.current.scale, { x: 0.4, y: 0.4, z: 0.4 });
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
      .to(group1Ref.current.scale, { x: 0.8, y: 0.8, z: 0.8 })
      .to(group2Ref.current.scale, { x: 0.6, y: 0.6, z: 0.6 }, "-=0.3");
  });

  return (
    <group ref={containerRef} position={[0, 0.3, 0]}>
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
