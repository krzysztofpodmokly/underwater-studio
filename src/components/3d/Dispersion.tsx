"use client";

import { useFBO, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { forwardRef, useMemo, useRef } from "react";
import * as THREE from "three";
import { useControls } from "leva";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { range } from "@/utils/range";

useGLTF.preload("/models/sphere.glb");

type DispersionModelProps = {};

const Dispersion = forwardRef<THREE.Group, DispersionModelProps>(
  (props, ref) => {
    const { nodes } = useGLTF("/models/sphere.glb");
    const mesh =
      useRef<THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>>(null);
    // const backgroundGroup = useRef<THREE.Group>(null);
    const mainRenderTarget = useFBO();

    const materialProps = useControls({
      iorR: { value: 1.15, min: 1.0, max: 2.333, step: 0.001 },
      iorY: { value: 1.16, min: 1.0, max: 2.333, step: 0.001 },
      iorG: { value: 1.18, min: 1.0, max: 2.333, step: 0.001 },
      iorC: { value: 1.22, min: 1.0, max: 2.333, step: 0.001 },
      iorB: { value: 1.22, min: 1.0, max: 2.333, step: 0.001 },
      iorP: { value: 1.23, min: 1.0, max: 2.333, step: 0.001 },
      refraction: { value: 0.4, min: 0, max: 1, step: 0.001 },
      chromaticAberration: { value: 0.5, min: 0, max: 1.5, step: 0.001 },
      saturation: { value: 1.06, min: 0, max: 1.25, step: 0.001 },
      light: { value: { x: -1, y: 1, z: 1 } },
      diffuseness: { value: 0.2 },
      shininess: { value: 40.0 },
      fresnelPower: { value: 8 },

      positionFrequency: { value: 0.1, min: 0, max: 2, step: 0.001 },
      timeFrequency: { value: 0.5, min: 0, max: 2, step: 0.001 },
      strength: { value: 0.3, min: 0, max: 2, step: 0.001 },
      warpPositionFrequency: { value: 0.2, min: 0, max: 2, step: 0.001 },
      warpTimeFrequency: { value: 0.4, min: 0, max: 2, step: 0.001 },
      warpStrength: { value: 0.6, min: 0, max: 2, step: 0.001 },
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
      const {
        iorR,
        iorY,
        iorG,
        iorC,
        iorB,
        iorP,
        refraction,
        chromaticAberration,
        saturation,
        light,
        diffuseness,
        shininess,
        positionFrequency,
        timeFrequency,
        strength,
        fresnelPower,
        warpPositionFrequency,
        warpTimeFrequency,
        warpStrength,
      } = materialProps;
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

      gl.setRenderTarget(null);

      // Show the mesh
      mesh.current.visible = true;

      // Set chromatic aberration values for the shader
      mesh.current.material.uniforms.uIorR.value = iorR;
      mesh.current.material.uniforms.uIorG.value = iorG;
      mesh.current.material.uniforms.uIorB.value = iorB;
      mesh.current.material.uniforms.uIorY.value = iorY;
      mesh.current.material.uniforms.uIorC.value = iorC;
      mesh.current.material.uniforms.uIorP.value = iorP;
      mesh.current.material.uniforms.uRefractPower.value = refraction;
      mesh.current.material.uniforms.uChromaticAberration.value =
        chromaticAberration;
      mesh.current.material.uniforms.uSaturation.value = saturation;
      mesh.current.material.uniforms.uDiffuseness.value = diffuseness;
      mesh.current.material.uniforms.uShininess.value = shininess;
      mesh.current.material.uniforms.uLight.value = new THREE.Vector3(
        light.x,
        light.y,
        light.z,
      );
      mesh.current.material.uniforms.uFresnelPower.value = fresnelPower;

      mesh.current.material.uniforms.uTime.value = elapsedTime;

      mesh.current.material.uniforms.uPositionFrequency.value =
        positionFrequency;
      mesh.current.material.uniforms.uTimeFrequency.value = timeFrequency;
      mesh.current.material.uniforms.uStrength.value = strength;

      mesh.current.material.uniforms.uWarpPositionFrequency.value =
        warpPositionFrequency;
      mesh.current.material.uniforms.uWarpTimeFrequency.value =
        warpTimeFrequency;
      mesh.current.material.uniforms.uWarpStrength.value = warpStrength;
    });

    const columns = range(-7.5, 7.5, 2.5);
    const rows = range(-7.5, 7.5, 2.5);

    const depthMaterial = new THREE.MeshDepthMaterial({
      depthPacking: THREE.RGBADepthPacking,
    });

    return (
      <group ref={ref}>
        {/* <group>
          {columns.map((col: number, i: number) =>
            rows.map((row: number, j: number) => (
              <mesh position={[col, row, -4]} key={i + j}>
                <icosahedronGeometry args={[0.333, 8]} />
                <meshStandardMaterial color="white" />
              </mesh>
            )),
          )}
        </group> */}

        <mesh
          geometry={(nodes.Icosphere as THREE.Mesh).geometry}
          customDepthMaterial={depthMaterial}
          ref={mesh}
          scale={[2, 2, 2]}
          rotation={[Math.PI / 2, 0, 0]}
          receiveShadow
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
