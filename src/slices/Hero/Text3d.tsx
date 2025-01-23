import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Text3d = () => {
  const { nodes } = useGLTF("/models/underwater-text.gltf");

  const URef = useRef<THREE.Mesh>(null);
  const NRef = useRef<THREE.Mesh>(null);
  const DRef = useRef<THREE.Mesh>(null);
  const ERef = useRef<THREE.Mesh>(null);
  const RRef = useRef<THREE.Mesh>(null);
  const WRef = useRef<THREE.Mesh>(null);
  const ARef = useRef<THREE.Mesh>(null);
  const TRef = useRef<THREE.Mesh>(null);
  const E2Ref = useRef<THREE.Mesh>(null);
  const R2Ref = useRef<THREE.Mesh>(null);

  const UGroupRef = useRef<THREE.Group>(null);
  const NGroupRef = useRef<THREE.Group>(null);
  const DGroupRef = useRef<THREE.Group>(null);
  const EGroupRef = useRef<THREE.Group>(null);
  const RGroupRef = useRef<THREE.Group>(null);
  const WGroupRef = useRef<THREE.Group>(null);
  const AGroupRef = useRef<THREE.Group>(null);
  const TGroupRef = useRef<THREE.Group>(null);
  const E2GroupRef = useRef<THREE.Group>(null);
  const R2GroupRef = useRef<THREE.Group>(null);

  const studioRef = useRef<THREE.Mesh>(null);
  const studioGroupRef = useRef<THREE.Group>(null);

  const lettersRef = useRef<THREE.Group>(null);
  const containerRef = useRef<THREE.Group>(null);

  useGSAP(() => {
    if (
      !RRef.current ||
      !RGroupRef.current ||
      !studioRef.current ||
      !studioGroupRef.current ||
      !ERef.current ||
      !EGroupRef.current ||
      !TRef.current ||
      !TGroupRef.current ||
      !ARef.current ||
      !AGroupRef.current ||
      !WRef.current ||
      !WGroupRef.current ||
      !R2Ref.current ||
      !R2GroupRef.current ||
      !E2Ref.current ||
      !E2GroupRef.current ||
      !DRef.current ||
      !DGroupRef.current ||
      !NRef.current ||
      !NGroupRef.current ||
      !URef.current ||
      !UGroupRef.current ||
      !lettersRef.current ||
      !containerRef.current
    )
      return;

    const UFinalPos = { x: -2.941, y: 0.092, z: -0.027 };
    const NFinalPos = { x: -2.34, y: 0.076, z: -0.027 };
    const DFinalPos = { x: -1.737, y: 0.069, z: -0.027 };
    const EFinalPos = { x: 1.842, y: 0.063, z: -0.027 };
    const RFinalPos = { x: 2.38, y: 0.061, z: -0.027 };
    const WFinalPos = { x: 0.068, y: 0.103, z: -0.027 };
    const AFinalPos = { x: 0.728, y: 0.014, z: -0.027 };
    const TFinalPos = { x: 1.297, y: 0.115, z: -0.027 };
    const E2FinalPos = { x: -1.167, y: 0.063, z: -0.027 };
    const R2FinalPos = { x: -0.629, y: 0.061, z: -0.027 };
    const studioFinalPos = { x: -0.322, y: -0.717, z: -0.027 };

    gsap.set(URef.current.position, { x: 17, y: 10, z: -4 });
    gsap.set(NRef.current.position, { x: 4, y: -8, z: -20 });
    gsap.set(DRef.current.position, { x: -10, y: 1, z: 10 });
    gsap.set(ERef.current.position, { x: 1, y: -1, z: -2 });
    gsap.set(RRef.current.position, { x: 5, y: -11, z: -6 });
    gsap.set(WRef.current.position, { x: 1, y: 13, z: 5 });
    gsap.set(ARef.current.position, { x: 7, y: 6, z: -5 });
    gsap.set(TRef.current.position, { x: -3, y: -3, z: -3 });
    gsap.set(E2Ref.current.position, { x: 1, y: 5, z: -5 });
    gsap.set(R2Ref.current.position, { x: 1, y: 1, z: -2 });
    gsap.set(studioRef.current.position, { x: 0, y: -5, z: -5 });
    gsap.set(studioRef.current.scale, { x: 0.7, y: 0.7, z: 0.7 });
    gsap.set(containerRef.current.rotation, { x: 0, y: 0, z: 0 });

    const introTl = gsap.timeline({
      defaults: {
        duration: 2,
        ease: "power2.inOut(2.5)",
      },
    });
    introTl
      .from(UGroupRef.current.position, { x: -1.5, y: -1.3, z: -5 })
      .from(NGroupRef.current.position, { x: 1, y: -2, z: -3 }, 0)
      .from(DGroupRef.current.position, { x: 2, y: 2, z: -2 }, 0)
      .from(EGroupRef.current.position, { x: 2.3, y: 0.2, z: -2 }, 0)
      .from(RGroupRef.current.position, { x: -1, y: 2 }, 0)
      .from(WGroupRef.current.position, { x: -0.1, y: -0.3, z: -4 }, 0)
      .from(AGroupRef.current.position, { x: 0.9, y: 0.6, z: -4 }, 0)
      .from(TGroupRef.current.position, { x: 1.1, y: -0.6, z: -6 }, 0)
      .from(E2GroupRef.current.position, { x: -0.9, y: 0.6, z: -3 }, 0)
      .from(R2GroupRef.current.position, { x: -1.3, y: -0.4, z: -3 }, 0)
      .from(studioGroupRef.current.position, { x: 0, y: -1, z: -10 }, 0)
      .to(lettersRef.current.rotation, { x: 0, y: 0, z: 0 }, 0);

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
      .to(RRef.current.position, RFinalPos)
      .to(studioRef.current.position, studioFinalPos, 0)
      .to(ERef.current.position, EFinalPos, 0)
      .to(TRef.current.position, TFinalPos, 0)
      .to(ARef.current.position, AFinalPos, 0)
      .to(WRef.current.position, WFinalPos, 0)
      .to(R2Ref.current.position, R2FinalPos, 0)
      .to(E2Ref.current.position, E2FinalPos, 0)
      .to(DRef.current.position, DFinalPos, 0)
      .to(NRef.current.position, NFinalPos, 0)
      .to(URef.current.position, UFinalPos, 0)
      .to(containerRef.current.rotation, { z: -Math.PI / 8 }, 1.5)
      .to(
        lettersRef.current.position,
        { x: 2, duration: 3, ease: "power1.inOut" },
        1.2,
      )
      .to(containerRef.current.scale, { x: 0.7, y: 0.7, z: 0.7 }, 1.5);
  });

  return (
    <group ref={containerRef}>
      <group dispose={null} position={[0, 0, -2]} ref={lettersRef}>
        <group ref={RGroupRef}>
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Text as THREE.Mesh).geometry}
            rotation={[Math.PI / 2, 0, 0]}
            ref={RRef}
          >
            <meshStandardMaterial />
            {/* <shaderMaterial
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
          /> */}
          </mesh>
        </group>
        <group ref={studioGroupRef}>
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Text006 as THREE.Mesh).geometry}
            rotation={[Math.PI / 2, 0, 0]}
            ref={studioRef}
          >
            <meshStandardMaterial />
          </mesh>
        </group>
        <group ref={EGroupRef}>
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Text007 as THREE.Mesh).geometry}
            rotation={[Math.PI / 2, 0, 0]}
            ref={ERef}
          >
            <meshStandardMaterial />
          </mesh>
        </group>
        <group ref={TGroupRef}>
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Text008 as THREE.Mesh).geometry}
            rotation={[Math.PI / 2, 0, 0]}
            ref={TRef}
          >
            <meshStandardMaterial />
          </mesh>
        </group>
        <group ref={AGroupRef}>
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Text009 as THREE.Mesh).geometry}
            rotation={[Math.PI / 2, 0, 0]}
            ref={ARef}
          >
            <meshStandardMaterial />
          </mesh>
        </group>
        <group ref={WGroupRef}>
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Text010 as THREE.Mesh).geometry}
            rotation={[Math.PI / 2, 0, 0]}
            ref={WRef}
          >
            <meshStandardMaterial />
          </mesh>
        </group>
        <group ref={R2GroupRef}>
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Text011 as THREE.Mesh).geometry}
            rotation={[Math.PI / 2, 0, 0]}
            ref={R2Ref}
          >
            <meshStandardMaterial />
          </mesh>
        </group>
        <group ref={E2GroupRef}>
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Text012 as THREE.Mesh).geometry}
            rotation={[Math.PI / 2, 0, 0]}
            ref={E2Ref}
          >
            <meshStandardMaterial />
          </mesh>
        </group>
        <group ref={DGroupRef}>
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Text013 as THREE.Mesh).geometry}
            rotation={[Math.PI / 2, 0, 0]}
            ref={DRef}
          >
            <meshStandardMaterial />
          </mesh>
        </group>
        <group ref={NGroupRef}>
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Text014 as THREE.Mesh).geometry}
            rotation={[Math.PI / 2, 0, 0]}
            ref={NRef}
          >
            <meshStandardMaterial />
          </mesh>
        </group>
        <group ref={UGroupRef}>
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Text015 as THREE.Mesh).geometry}
            rotation={[Math.PI / 2, 0, 0]}
            ref={URef}
          >
            <meshStandardMaterial />
          </mesh>
        </group>
      </group>
    </group>
  );
};

export default Text3d;
