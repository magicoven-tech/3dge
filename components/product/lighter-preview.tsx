"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface LighterPreviewProps {
    text: string;
    image: string;
    className?: string;
    color?: string; // Optional if we want to change image hue or background
}

export function LighterPreview({ text, image, className, color }: LighterPreviewProps) {
    return (
        <div className={cn("relative w-full max-w-[400px] aspect-[3/5] mx-auto", className)}>
            {/* Background/Shadow effect */}
            <div className={cn(
                "absolute inset-0 bg-gradient-to-tr from-transparent to-primary/20 rounded-full blur-3xl opacity-50",
                color === "black" ? "to-stone-800/20" : "to-primary/20"
            )} />

            <div className="relative w-full h-full">
                <Image
                    src={image}
                    alt="Lighter Preview"
                    fill
                    className="object-contain drop-shadow-2xl z-10"
                    priority
                />

                {/* Text Overlay Logic */}
                {/* Adjust top/left/transform based on the actual product image perspective. 
            For MVP, assuming a vertical lighter centered. */}
                <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[60%] text-center break-words pointer-events-none">
                    <span className={cn(
                        "font-mono font-bold text-stone-900/80 tracking-widest uppercase",
                        // Simulating 'engraved' look or printed text
                        "text-xl sm:text-2xl drop-shadow-sm mix-blend-multiply",
                        text.length > 8 ? "text-lg sm:text-xl" : ""
                    )}
                        style={{ wordBreak: 'break-all' }}
                    >
                        {text}
                    </span>
                </div>
            </div>
        </div>
    );
}
