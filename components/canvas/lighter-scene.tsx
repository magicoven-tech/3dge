"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, Center, Text, useGLTF } from "@react-three/drei"
import { useEffect, useMemo } from "react"
import * as THREE from "three"

// Pre-load to avoid flash
useGLTF.preload('/assets/3d/modelo.glb')

interface LighterSceneProps {
    text: string
    color: string
    textPosition?: { x: number; y: number }
}

function LighterModel({ text, color, textPosition = { x: 0, y: 0 } }: LighterSceneProps) {
    const { scene } = useGLTF('/assets/3d/modelo.glb')

    // Clone the scene so we can modify materials without affecting other instances (if any)
    // useMemo with clone is a good pattern here
    const clonedScene = useMemo(() => scene.clone(), [scene])

    // Update material color whenever color prop changes
    useEffect(() => {
        clonedScene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh
                // Ensure material is cloned if it's shared, though scene.clone() usually handles shallow copies of materials? 
                // Actually scene.clone() shares geometries and materials. So we MUST clone material.
                if (!Array.isArray(mesh.material)) {
                    mesh.material = (mesh.material as THREE.Material).clone();
                    (mesh.material as THREE.MeshStandardMaterial).color.set(color);
                }
            }
        })
    }, [clonedScene, color])

    // Height limits simulating Ender 3 bed or similar logic if needed
    // specific logic from prompt: clampedY = Math.min(Math.max(textPosition.y, -1.0), 1.0)
    // Note: user prompt mentioned `textPosition` arg. 
    // Let's implement that logic.
    const clampedY = Math.min(Math.max(textPosition.y, -1.0), 1.0)

    return (
        <group dispose={null}>
            <Center>
                {/* The Real GLB Model */}
                <primitive object={clonedScene} scale={0.5} />

                {/* Floating Text (Simulating Embossing/Engraving) */}
                {/* Adjust 'z' (0.6) until text pops out of model */}
                <Text
                    position={[0, clampedY, 0.6]}
                    rotation={[0, 0, 0]}
                    fontSize={0.35}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={2}
                >
                    {text}
                </Text>
            </Center>
        </group>
    )
}

export function LighterScene(props: LighterSceneProps) {
    return (
        <div className="w-full h-full bg-stone-100 cursor-move relative">
            <Canvas shadows camera={{ position: [0, 0, 120], fov: 45 }}>
                <ambientLight intensity={0.1} />
                <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                <Environment preset="studio" />

                <LighterModel {...props} />

                <OrbitControls
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.8}
                    enableZoom={true}
                    maxDistance={200}
                    minDistance={5}
                />
            </Canvas>
        </div>
    )
}
