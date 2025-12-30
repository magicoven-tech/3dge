"use client";

import { cn } from "@/lib/utils";
import { LighterScene } from "@/components/canvas/lighter-scene";

interface LighterPreviewProps {
    text: string;
    image: string;
    className?: string;
    color?: string; // Optional if we want to change image hue or background
}

export function LighterPreview({ text, image, className, color }: LighterPreviewProps) {
    return (
        <div className={cn("relative w-full h-full overflow-hidden bg-stone-100", className)}>
            <LighterScene
                text={text}
                color={color || "#cdcdcdff"}
                textPosition={{ x: 0, y: 0 }}
            />
        </div>
    );
}
