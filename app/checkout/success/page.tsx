"use client";

import { useCart } from "@/context/cart-context";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, DownloadSimple } from "@phosphor-icons/react";
import { Canvas } from "@react-three/fiber";
import { StlExporter } from "@/components/canvas/stl-exporter";

export default function CheckoutSuccessPage() {
    const { items } = useCart(); // Use items directly, assuming they persist for this session
    // In a real app, you'd fetch the order by ID to avoid clearing cart issues.
    // For this mock, we'll assume the cart isn't cleared instantly or we saved it before redirect.
    // However, to be safe, let's assume we read from the cart context.

    // State to track downloads
    const [downloadedCount, setDownloadedCount] = useState(0);

    return (
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center max-w-2xl">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-8">
                <CheckCircle size={48} className="text-green-600 dark:text-green-400" weight="fill" />
            </div>

            <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Order Confirmed!</h1>
            <p className="text-xl text-muted-foreground mb-12">
                Thank you for your purchase. Your customized 3D models are being generated and downloaded automatically.
            </p>

            <div className="bg-stone-50 dark:bg-stone-900 p-8 rounded-lg w-full space-y-6">
                <h3 className="font-bold uppercase tracking-wide flex items-center justify-center gap-2">
                    <DownloadSimple size={20} />
                    Generating STL Files ({downloadedCount}/{items.length})
                </h3>

                <div className="space-y-2">
                    {items.map((item, index) => (
                        <div key={item.id} className="flex items-center justify-between text-sm p-3 border rounded bg-background">
                            <span>{item.name} - "{item.customText}"</span>
                            <span className="text-muted-foreground font-mono text-xs">
                                {index < downloadedCount ? "Downloaded" : "Processing..."}
                            </span>
                        </div>
                    ))}
                </div>

                {/* HIDDEN CANVASES FOR GENERATION */}
                <div className="fixed top-0 left-0 w-1 h-1 opacity-0 pointer-events-none overflow-hidden">
                    {items.map((item, index) => {
                        // Sequential generation logic could be added here to avoid browser lag,
                        // but for simplicity we render all. Ideally, we mount one, wait for callback, mount next.
                        // Let's rely on React concurrency for now or basic rendering.

                        return (
                            <Canvas key={item.id} gl={{ preserveDrawingBuffer: true }}>
                                <StlExporter
                                    product={{ model: item.model, name: item.name }}
                                    textConfig={{
                                        text: item.customText,
                                        position: item.textConfig.position,
                                        rotation: item.textConfig.rotation,
                                        fontSize: item.textConfig.fontSize
                                    }}
                                    onExported={() => setDownloadedCount(prev => prev + 1)}
                                />
                            </Canvas>
                        );
                    })}
                </div>
            </div>

            <div className="mt-12">
                <Link href="/">
                    <Button variant="outline">Back to Shop</Button>
                </Link>
            </div>
        </div>
    );
}
