import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/data";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"; // Use SSR import if available, or just regular if configured. Usually @phosphor-icons/react works in server components too or might need 'use client' wrapper for icons? 
// Phosphor icons are typically client components. 
// If page is server component, I might need to wrap icon or use a client component for the button. 
// Standard shadcn button wraps primitive.
// Let's use standard import. If it fails, I'll switch to client component.
// Actually, 'app/page.tsx' is server component by default. Phosphor React icons export components that might use Context?
// Usually safe to import. 
// But wait, "ArrowRight" might not be exported from main entry if I don't use "use client".
// Let's try standard import.

export default function Home() {
    const product = PRODUCTS[0];

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            <section className="flex-1 flex flex-col items-center justify-center text-center p-4 py-8 md:py-16 space-y-8 md:space-y-12 bg-stone-950 text-stone-50">
                <div className="space-y-4 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
                        Design <br className="md:hidden" />
                        <span className="text-primary">Your Flame</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-stone-400 font-medium tracking-tight max-w-2xl mx-auto">
                        Hyper-customizable 3D printed accessories. <br />
                        Engineered for the future.
                    </p>
                </div>

                <div className="relative w-full max-w-md aspect-[4/5] md:aspect-square bg-gradient-to-b from-stone-900 to-stone-950 rounded-lg border border-stone-800 overflow-hidden shadow-2xl shadow-primary/10">
                    {/* Placeholder if image missing, or use Next Image */}
                    <div className="absolute inset-0 flex items-center justify-center text-stone-800">
                        <span className="font-bold text-9xl select-none opacity-20">3DGE</span>
                    </div>
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-8 hover:scale-105 transition-transform duration-500"
                        priority
                    />
                </div>

                <div>
                    <Link href={`/studio/${product.slug}`} className={buttonVariants({ size: "lg", className: "h-14 px-8 text-lg font-bold rounded-none bg-primary text-black hover:bg-primary/90 hover:scale-105 transition-all" })}>
                        START CUSTOMIZING
                    </Link>
                </div>
            </section>
        </div>
    );
}