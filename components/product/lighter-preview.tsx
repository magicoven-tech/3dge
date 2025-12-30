import { cn } from "@/lib/utils";
import { LighterScene } from "@/components/canvas/lighter-scene";

interface LighterPreviewProps {
    text: string;
    image: string;
    className?: string;
    color?: string;
    model?: string;
    textConfig: {
        position: { x: number; y: number; z: number };
        rotation: { x: number; y: number; z: number };
        fontSize: number;
    };
}

export function LighterPreview({ text, image, className, color, model, textConfig }: LighterPreviewProps) {
    return (
        <div className={cn("relative w-full h-full overflow-hidden bg-stone-100 dark:bg-stone-900 group", className)}>
            <LighterScene
                text={text}
                color={color || "#cdcdcd"}
                model={model || "/assets/3d/phone.glb"}
                textConfig={textConfig}
            />
        </div>
    );
}

