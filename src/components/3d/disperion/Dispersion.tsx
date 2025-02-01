"use client";

import { useFBO, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { forwardRef, useMemo, useRef } from "react";
import * as THREE from "three";
import { useControls, folder } from "leva";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { useStore } from "@/hooks/useStore";

type DispersionModelProps = {
  name: string;
  positionFrequency?: number;
  timeFrequency?: number;
  strength?: number;
  warpPositionFrequency?: number;
  warpTimeFrequency?: number;
  warpStrength?: number;
  light?: { x: number; y: number; z: number };
};

const Dispersion = forwardRef<THREE.Group, DispersionModelProps>(
  (
    {
      name,
      positionFrequency = 0.15,
      timeFrequency = 0.25,
      strength = 0.15,
      warpPositionFrequency = 1.3,
      warpTimeFrequency = 0.4,
      warpStrength = 0.6,
      light: lightConfig = { x: -1, y: -1, z: 1 },
    },
    ref,
  ) => {
    const isReady = useStore((state) => state.isReady);
    const { nodes } = useGLTF("/models/sphere4.glb");
    const mesh =
      useRef<THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>>(null);
    const mainRenderTarget = useFBO();

    const materialProps = useControls(`${name}`, {
      ior: folder({
        iorR: { value: 1.15, min: 1.0, max: 2.333, step: 0.001 },
        iorY: { value: 1.16, min: 1.0, max: 2.333, step: 0.001 },
        iorG: { value: 1.18, min: 1.0, max: 2.333, step: 0.001 },
        iorC: { value: 1.22, min: 1.0, max: 2.333, step: 0.001 },
        iorB: { value: 1.22, min: 1.0, max: 2.333, step: 0.001 },
        iorP: { value: 1.23, min: 1.0, max: 2.333, step: 0.001 },
      }),

      effects: folder({
        refraction: { value: 0.4, min: 0, max: 1, step: 0.001 },
        chromaticAberration: { value: 0.5, min: 0, max: 1.5, step: 0.001 },
        saturation: { value: 1.06, min: 0, max: 1.25, step: 0.001 },
        light: {
          value: { x: lightConfig.x, y: lightConfig.y, z: lightConfig.z },
        },
        diffuseness: { value: 0.2 },
        shininess: { value: 40.0 },
        fresnelPower: { value: 8 },
      }),

      wobble: folder({
        positionFrequency: {
          value: positionFrequency,
          min: 0,
          max: 2,
          step: 0.001,
        },
        timeFrequency: { value: timeFrequency, min: 0, max: 2, step: 0.001 },
        strength: { value: strength, min: 0, max: 2, step: 0.001 },
        warpPositionFrequency: {
          value: warpPositionFrequency,
          min: 0,
          max: 2,
          step: 0.001,
        },
        warpTimeFrequency: {
          value: warpTimeFrequency,
          min: 0,
          max: 2,
          step: 0.001,
        },
        warpStrength: { value: warpStrength, min: 0, max: 2, step: 0.001 },
      }),
    });

    const uniforms = useMemo(
      () => ({
        uTexture: new THREE.Uniform(null),
        uIorR: new THREE.Uniform(1.0),
        uIorY: new THREE.Uniform(1.0),
        uIorG: new THREE.Uniform(1.0),
        uIorC: new THREE.Uniform(1.0),
        uIorB: new THREE.Uniform(1.0),
        uIorP: new THREE.Uniform(1.0),
        uRefractPower: new THREE.Uniform(0.2),
        uChromaticAberration: new THREE.Uniform(1.0),
        uSaturation: new THREE.Uniform(0.0),
        uShininess: new THREE.Uniform(40),
        uDiffuseness: new THREE.Uniform(0.2),
        uLight: new THREE.Uniform(new THREE.Vector3(-1.0, 1.0, 1.0)),
        uFresnelPower: new THREE.Uniform(1),

        uTime: new THREE.Uniform(0.0),
        winResolution: new THREE.Uniform(
          new THREE.Vector2(
            window.innerWidth,
            window.innerHeight,
          ).multiplyScalar(Math.min(window.devicePixelRatio, 2)),
        ),

        uPositionFrequency: new THREE.Uniform(0.5),
        uTimeFrequency: new THREE.Uniform(0.4),
        uStrength: new THREE.Uniform(0.3),
        uWarpPositionFrequency: new THREE.Uniform(0.38),
        uWarpTimeFrequency: new THREE.Uniform(0.12),
        uWarpStrength: new THREE.Uniform(1.7),
      }),
      [],
    );

    useFrame(({ gl, scene, camera, clock }) => {
      if (!mesh.current) return;
      isReady(); // make sure that gsap animations are played once 3d models are available

      const elapsedTime = clock.getElapsedTime();
      // Pass the snapshot texture data to our shader material

      gl.setRenderTarget(null);

      // Hide the mesh
      mesh.current.visible = false;
      gl.setRenderTarget(mainRenderTarget);

      // Render into the FBO
      gl.render(scene, camera);

      // Pass the snapshot texture data to our shader material
      mesh.current.material.uniforms.uTexture.value = mainRenderTarget.texture;
      mesh.current.rotation.set(0, elapsedTime * 0.2, elapsedTime * 0.4);

      gl.setRenderTarget(null);

      // Show the mesh
      mesh.current.visible = true;

      // Set chromatic aberration values for the shader
      mesh.current.material.uniforms.uIorR.value = materialProps.iorR;
      mesh.current.material.uniforms.uIorG.value = materialProps.iorG;
      mesh.current.material.uniforms.uIorB.value = materialProps.iorB;
      mesh.current.material.uniforms.uIorY.value = materialProps.iorY;
      mesh.current.material.uniforms.uIorC.value = materialProps.iorC;
      mesh.current.material.uniforms.uIorP.value = materialProps.iorP;
      mesh.current.material.uniforms.uRefractPower.value =
        materialProps.refraction;
      mesh.current.material.uniforms.uChromaticAberration.value =
        materialProps.chromaticAberration;
      mesh.current.material.uniforms.uSaturation.value =
        materialProps.saturation;
      mesh.current.material.uniforms.uDiffuseness.value =
        materialProps.diffuseness;
      mesh.current.material.uniforms.uShininess.value = materialProps.shininess;
      mesh.current.material.uniforms.uLight.value = new THREE.Vector3(
        materialProps.light.x,
        materialProps.light.y,
        materialProps.light.z,
      );
      mesh.current.material.uniforms.uFresnelPower.value =
        materialProps.fresnelPower;

      mesh.current.material.uniforms.uTime.value = elapsedTime;

      mesh.current.material.uniforms.uPositionFrequency.value =
        materialProps.positionFrequency;
      mesh.current.material.uniforms.uTimeFrequency.value =
        materialProps.timeFrequency;
      mesh.current.material.uniforms.uStrength.value = materialProps.strength;

      mesh.current.material.uniforms.uWarpPositionFrequency.value =
        materialProps.warpPositionFrequency;
      mesh.current.material.uniforms.uWarpTimeFrequency.value =
        materialProps.warpTimeFrequency;
      mesh.current.material.uniforms.uWarpStrength.value =
        materialProps.warpStrength;
    });

    return (
      <group ref={ref}>
        <mesh
          geometry={(nodes.Icosphere as THREE.Mesh).geometry}
          ref={mesh}
          scale={[0.5, 0.5, 0.5]}
        >
          <shaderMaterial
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
          />
        </mesh>
      </group>
    );
  },
);

export default Dispersion;
