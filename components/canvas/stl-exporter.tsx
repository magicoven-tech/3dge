"use client";

import { useGLTF, Text3D, Center, Resize } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useState, useMemo } from "react";
import { STLExporter } from "three-stdlib";
import * as THREE from "three";

interface StlExporterProps {
    product: {
        model: string;
        name: string;
    };
    textConfig: {
        text: string;
        position: { x: number; y: number; z: number };
        rotation: { x: number; y: number; z: number };
        fontSize: number;
    };
    onExported?: () => void;
}

export function StlExporter({ product, textConfig, onExported }: StlExporterProps) {
    console.log("Exporter received:", product.name, product.model);
    const { scene } = useGLTF(product.model);
    const { scene: threeScene } = useThree();
    const [isExporting, setIsExporting] = useState(false);

    // Clone scene to avoid modifying the original if used elsewhere
    const clonedScene = useMemo(() => scene.clone(), [scene]);

    useEffect(() => {
        if (!clonedScene || isExporting) return;

        // Small timeout to ensure geometry is ready
        const timer = setTimeout(() => {
            setIsExporting(true);
            const exporter = new STLExporter();
            const str = exporter.parse(threeScene); // Export the entire scene currently formatted
            const blob = new Blob([str], { type: "model/stl" });
            const link = document.createElement("a");
            link.style.display = "none";
            link.href = URL.createObjectURL(blob);
            link.download = `${product.name.replace(/\s+/g, "_")}_${textConfig.text || "custom"}.stl`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            if (onExported) onExported();
        }, 1000);

        return () => clearTimeout(timer);
    }, [clonedScene, isExporting, product.name, textConfig.text, threeScene, onExported]);

    return (
        <group>
            {/* Recreate the exact scaling logic from LighterScene */}
            <Center top>
                <Resize scale={10}>
                    <primitive object={clonedScene} />
                </Resize>
            </Center>

            {/* Helper: Add the text */}
            <group
                position={[textConfig.position.x, textConfig.position.y, textConfig.position.z]}
                rotation={[textConfig.rotation.x, textConfig.rotation.y, textConfig.rotation.z]}
            >
                <Center>
                    {textConfig.text && (
                        <Text3D
                            font="https://unpkg.com/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json"
                            size={textConfig.fontSize}
                            height={0.2}
                            curveSegments={12}
                            bevelEnabled={false}
                        >
                            {textConfig.text}
                            <meshStandardMaterial color="white" />
                        </Text3D>
                    )}
                </Center>
            </group>
        </group>
    );
}
