"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, Center, Text3D, useGLTF, Resize, GizmoHelper, GizmoViewcube, ContactShadows } from "@react-three/drei"
import { useEffect, useMemo } from "react"
import * as THREE from "three"

// Define distinct props for clarity, even if structurally identical
interface ModelProps {
    text: string
    color: string
    model: string
    textConfig: {
        position: { x: number; y: number; z: number }
        rotation: { x: number; y: number; z: number }
        fontSize: number
    }
}

interface SceneProps {
    text: string
    color: string
    model: string
    textConfig: {
        position: { x: number; y: number; z: number }
        rotation: { x: number; y: number; z: number }
        fontSize: number
    }
}

// This component is defined at the top level of the module.
function LighterModel({ text, color, model, textConfig }: ModelProps) {
    const { scene } = useGLTF(model)

    // Clone the scene so we can modify materials without affecting other instances
    const clonedScene = useMemo(() => scene.clone(), [scene])

    // Update material color whenever color prop changes
    useEffect(() => {
        const colorValue = color === 'stone' ? '#d6d3d1' : color;
        clonedScene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh
                if (!Array.isArray(mesh.material)) {
                    mesh.material = (mesh.material as THREE.Material).clone();
                    (mesh.material as THREE.MeshStandardMaterial).color.set(colorValue);
                }
            }
        })
    }, [clonedScene, color])

    return (
        <group dispose={null}>
            <Center top>
                <Resize scale={10}>
                    <primitive object={clonedScene} />
                </Resize>
            </Center>

            <group
                position={[textConfig.position.x, textConfig.position.y, textConfig.position.z]}
                rotation={[textConfig.rotation.x, textConfig.rotation.y, textConfig.rotation.z]}
            >
                <Center>
                    {text && (
                        <Text3D
                            font="https://unpkg.com/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json"
                            size={textConfig.fontSize}
                            height={0.2}
                            curveSegments={12}
                            bevelEnabled={false}
                        >
                            {text}
                            <meshStandardMaterial
                                color="#ffffff"
                                roughness={0.3}
                                metalness={0.8}
                                depthTest={false} /* Always render on top */
                                depthWrite={false}
                                toneMapped={false}
                            />
                        </Text3D>
                    )}
                </Center>
            </group>
        </group>
    )
}

export function LighterScene(props: SceneProps) {
    return (
        <div className="w-full h-full bg-stone-100 dark:bg-stone-900 cursor-move relative">
            <Canvas shadows camera={{ position: [0, 0, 15], fov: 45 }}>
                {/* CAD-like Lights & Environment */}
                <ambientLight intensity={0.7} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <Environment preset="city" />

                <group position={[0, -0.5, 0]}>
                    <LighterModel {...props} />
                    <ContactShadows position={[0, -0.05, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
                </group>

                <OrbitControls
                    makeDefault
                    enableDamping
                    dampingFactor={0.05}
                    rotateSpeed={0.6}
                    enablePan={true}
                    panSpeed={0.6}
                    minDistance={2}
                    maxDistance={20}
                />

                {/* Shapr3D-like Navigation Gizmo */}
                <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                    <GizmoViewcube
                        font="16px Inter"
                        opacity={0.85}
                        color="white"
                        hoverColor="#d6d3d1"
                        textColor="black"
                        strokeColor="#d6d3d1"
                    />
                </GizmoHelper>
            </Canvas>
        </div>
    )
}
