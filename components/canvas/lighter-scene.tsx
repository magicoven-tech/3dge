"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, Center, Text3D, useGLTF } from "@react-three/drei"
import { useEffect, useMemo } from "react"
import * as THREE from "three"

interface LighterSceneProps {
    text: string
    color: string
    model: string
    textConfig: {
        position: { x: number; y: number; z: number }
        rotation: { x: number; y: number; z: number }
        fontSize: number
    }
}

function LighterModel({ text, color, model, textConfig }: LighterSceneProps) {
    const { scene } = useGLTF(model)

    // Clone the scene so we can modify materials without affecting other instances
    const clonedScene = useMemo(() => scene.clone(), [scene])

    // Update material color whenever color prop changes
    useEffect(() => {
        clonedScene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh
                if (!Array.isArray(mesh.material)) {
                    mesh.material = (mesh.material as THREE.Material).clone();
                    (mesh.material as THREE.MeshStandardMaterial).color.set(color);
                }
            }
        })
    }, [clonedScene, color])

    return (
        <group dispose={null}>
            <Center>
                <primitive object={clonedScene} scale={0.5} />
            </Center>
            <Text3D
                font="https://unpkg.com/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json"
                position={[textConfig.position.x, textConfig.position.y, textConfig.position.z]}
                rotation={[textConfig.rotation.x, textConfig.rotation.y, textConfig.rotation.z]}
                size={textConfig.fontSize}
                height={0.4}
                curveSegments={12}
                bevelEnabled={false}
            >
                {text || "Seu nome"}
                <meshStandardMaterial color="#cc5500" roughness={0.6} />
            </Text3D>
        </group>
    )
}

export function LighterScene(props: LighterSceneProps) {
    return (
        <div className="w-full h-full bg-stone-100 dark:bg-stone-900 cursor-move relative">
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
