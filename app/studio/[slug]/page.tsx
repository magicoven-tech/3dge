"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CaretLeft, ShoppingBag } from "@phosphor-icons/react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LighterPreview } from "@/components/product/lighter-preview";
import { getProductBySlug } from "@/lib/data";

export default function StudioPage({ params }: { params: Promise<{ slug: string }> }) {
    // Unwrap params using React.use() or await (in server component). Since this is client, we need 'use' or just assume async params resolution in Next 15/16.
    // Next.js 15+ params are promises.
    const { slug } = use(params);

    const product = getProductBySlug(slug);
    const router = useRouter();

    const [customText, setCustomText] = useState("");
    const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "black");
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    if (!product) {
        return <div>Product not found</div>;
    }

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            customText,
            color: selectedColor,
        });
        // Simulate delay for effect or just open sheet (sheet opens automatically via context triggers? No, usually needs state or Trigger. But here we added to context. The Sheet is in Header. We might want to trigger it open, but for now just adding is fine.)
        // To auto-open sheet, we'd need global state for sheet availability, or just rely on user clicking it.
        // MVP: Just add and show "Added" state on button or similar.
        setTimeout(() => setIsAdding(false), 1000);
    };

    return (
        <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)] overflow-hidden">
            {/* LEFT: Preview Area (Sticky/Fixed on Desktop) */}
            <div className="w-full md:w-1/2 bg-stone-100 dark:bg-stone-900 flex flex-col items-center justify-center p-0 relative overflow-hidden">
                <Link href="/" className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors z-20">
                    <CaretLeft size={20} />
                    <span className="font-bold text-sm">BACK</span>
                </Link>
                <LighterPreview text={customText} image={product.image} color={selectedColor} />
            </div>

            {/* RIGHT: Controls Area (Scrollable) */}
            <div className="w-full md:w-1/2 bg-background flex flex-col p-6 md:p-12 overflow-y-auto">
                <div className="max-w-md mx-auto w-full space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">{product.name}</h1>
                        <p className="text-xl text-muted-foreground font-medium">${product.price.toFixed(2)}</p>
                    </div>

                    <div className="space-y-6">
                        {/* Text Input */}
                        <div className="space-y-3">
                            <Label htmlFor="custom-text" className="uppercase font-bold text-xs tracking-widest text-muted-foreground">Custom Text</Label>
                            <Input
                                id="custom-text"
                                placeholder="YOUR TEXT"
                                maxLength={12}
                                value={customText}
                                onChange={(e) => setCustomText(e.target.value)}
                                className="h-14 text-lg font-mono uppercase tracking-widest border-2 border-stone-200 focus-visible:ring-primary focus-visible:border-primary transition-all"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Max 12 characters</span>
                                <span>{customText.length}/12</span>
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div className="space-y-3">
                            <Label className="uppercase font-bold text-xs tracking-widest text-muted-foreground">Material Color</Label>
                            <RadioGroup
                                value={selectedColor}
                                onValueChange={(value) => setSelectedColor(value as string)}
                                className="flex gap-4"
                            >
                                {product.colors.map((color) => (
                                    <div key={color} className="flex items-center space-x-2">
                                        <RadioGroupItem value={color} id={`color-${color}`} className="peer sr-only" />
                                        <Label
                                            htmlFor={`color-${color}`}
                                            className={`
                                    flex cursor-pointer items-center justify-center rounded-full border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary
                                    h-12 w-12 transition-all
                                  `}
                                        >
                                            <span className="w-full h-full rounded-full bg-current opacity-80" style={{ backgroundColor: color === 'stone' ? '#d6d3d1' : color }} />
                                            <span className="sr-only">{color}</span>
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="pt-8 md:pt-16">
                        <Button
                            size="lg"
                            className="w-full h-16 text-xl font-bold uppercase tracking-wider relative overflow-hidden group"
                            onClick={handleAddToCart}
                            disabled={isAdding}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isAdding ? "Adding..." : "Add to Cart"}
                                {!isAdding && <ShoppingBag weight="bold" />}
                            </span>
                            {/* Hover Effect */}
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </Button>
                        <p className="text-center text-xs text-muted-foreground mt-4">
                            3D printed on demand. Ships in 3-5 days.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
