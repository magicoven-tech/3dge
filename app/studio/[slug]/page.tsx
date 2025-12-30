"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CaretLeft, ShoppingBag } from "@phosphor-icons/react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LighterPreview } from "@/components/product/lighter-preview";
import { getProductBySlug, PRODUCTS } from "@/lib/data";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

import { Slider } from "@/components/ui/slider";

export default function StudioPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const product = getProductBySlug(slug);
    const router = useRouter();

    const [customText, setCustomText] = useState("");
    const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "black");

    // Text Config State
    const [position, setPosition] = useState({ x: "0", y: "0", z: "1.5" });
    const [rotation, setRotation] = useState({ x: "0", y: "0", z: "0" });
    const [fontSize, setFontSize] = useState("1.5");

    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    if (!product) {
        return <div className="flex items-center justify-center h-screen">Product not found</div>;
    }

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            model: product.model,
            customText,
            color: selectedColor,
            textConfig: {
                position: { x: parseFloat(position.x) || 0, y: parseFloat(position.y) || 0, z: parseFloat(position.z) || 0 },
                rotation: { x: parseFloat(rotation.x) || 0, y: parseFloat(rotation.y) || 0, z: parseFloat(rotation.z) || 0 },
                fontSize: parseFloat(fontSize) || 0.5
            },
        });
        setTimeout(() => setIsAdding(false), 1000);
    };

    const relatedProducts = PRODUCTS.filter(p => p.id !== product.id);

    // Helper for sliders
    const updatePosition = (axis: 'x' | 'y' | 'z', value: string) => {
        setPosition(prev => ({ ...prev, [axis]: value }));
    };
    const updateRotation = (axis: 'x' | 'y' | 'z', value: string) => {
        setRotation(prev => ({ ...prev, [axis]: value }));
    };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                {/* LEFT: Preview Area */}
                <div className="w-full md:w-1/2 bg-stone-100 dark:bg-stone-900 flex flex-col items-center justify-center p-0 relative overflow-hidden">
                    <Link href="/" className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors z-20">
                        <CaretLeft size={20} />
                        <span className="font-bold text-sm">BACK</span>
                    </Link>
                    {/* Pass model prop to LighterPreview */}
                    <LighterPreview
                        text={customText}
                        image={product.image}
                        color={selectedColor === 'stone' ? '#d6d3d1' : selectedColor}
                        model={product.model}
                        textConfig={{
                            position: { x: parseFloat(position.x) || 0, y: parseFloat(position.y) || 0, z: parseFloat(position.z) || 0 },
                            rotation: { x: parseFloat(rotation.x) || 0, y: parseFloat(rotation.y) || 0, z: parseFloat(rotation.z) || 0 },
                            fontSize: parseFloat(fontSize) || 0.5
                        }}
                    />
                </div>

                {/* RIGHT: Controls Area */}
                <div className="w-full md:w-1/2 bg-background flex flex-col overflow-y-auto">
                    <div className="p-6 md:p-12 flex-1">
                        <div className="max-w-md mx-auto w-full space-y-8">
                            <div className="space-y-2">
                                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">{product.name}</h1>
                                <p className="text-xl text-muted-foreground font-medium">R$ {product.price.toFixed(2)}</p>
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
                                        onChange={(e) => setCustomText(e.target.value.toUpperCase())}
                                        className="h-14 text-lg font-mono uppercase tracking-widest border-2 border-stone-200 focus-visible:ring-primary focus-visible:border-primary transition-all"
                                    />
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>Max 12 characters</span>
                                        <span>{customText.length}/12</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 pt-4 border-t border-stone-100">
                                    <Label className="text-xs font-semibold whitespace-nowrap min-w-16">Size</Label>
                                    <Input
                                        type="number"
                                        min={0.5} max={5} step={0.1}
                                        value={fontSize}
                                        onChange={(e) => setFontSize(e.target.value)}
                                        className="h-8 font-mono"
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <Label className="text-xs font-semibold whitespace-nowrap min-w-16">Pos X</Label>
                                    <Input
                                        type="number"
                                        min={-6} max={6} step={0.1}
                                        value={position.x}
                                        onChange={(e) => updatePosition('x', e.target.value)}
                                        className="h-8 font-mono"
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <Label className="text-xs font-semibold whitespace-nowrap min-w-16">Pos Y</Label>
                                    <Input
                                        type="number"
                                        min={-6} max={6} step={0.1}
                                        value={position.y}
                                        onChange={(e) => updatePosition('y', e.target.value)}
                                        className="h-8 font-mono"
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <Label className="text-xs font-semibold whitespace-nowrap min-w-16">Pos Z</Label>
                                    <Input
                                        type="number"
                                        min={-10} max={10} step={0.1}
                                        value={position.z}
                                        onChange={(e) => updatePosition('z', e.target.value)}
                                        className="h-8 font-mono"
                                    />
                                </div>

                                <div className="h-px bg-stone-100 my-4" />

                                <div className="flex items-center gap-4">
                                    <Label className="text-xs font-semibold whitespace-nowrap min-w-16">Rot X</Label>
                                    <Input
                                        type="number"
                                        min={-6.28} max={6.28} step={0.1}
                                        value={rotation.x}
                                        onChange={(e) => updateRotation('x', e.target.value)}
                                        className="h-8 font-mono"
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <Label className="text-xs font-semibold whitespace-nowrap min-w-16">Rot Y</Label>
                                    <Input
                                        type="number"
                                        min={-6.28} max={6.28} step={0.1}
                                        value={rotation.y}
                                        onChange={(e) => updateRotation('y', e.target.value)}
                                        className="h-8 font-mono"
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <Label className="text-xs font-semibold whitespace-nowrap min-w-16">Rot Z</Label>
                                    <Input
                                        type="number"
                                        min={-6.28} max={6.28} step={0.1}
                                        value={rotation.z}
                                        onChange={(e) => updateRotation('z', e.target.value)}
                                        className="h-8 font-mono"
                                    />
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
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* RECOMMENDATION CAROUSEL */}
                    <div className="border-t border-stone-100 dark:border-stone-800 p-6 bg-stone-50 dark:bg-stone-900/50">
                        <div className="max-w-4xl mx-auto space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground text-center">You might also like</h3>
                            <Carousel opts={{ align: "start" }} className="w-full">
                                <CarouselContent>
                                    {relatedProducts.map((p) => (
                                        <CarouselItem key={p.id} className="basis-1/2 md:basis-1/3">
                                            <Link href={`/studio/${p.slug}`}>
                                                <Card className="border-none shadow-none bg-transparent hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
                                                    <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
                                                        <div className="relative w-24 h-24 bg-stone-200 dark:bg-stone-800 rounded-md overflow-hidden">
                                                            <Image src={p.image} alt={p.name} fill sizes="100px" className="object-contain p-2" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-xs font-bold uppercase truncate max-w-[120px]">{p.name}</p>
                                                            <p className="text-xs text-muted-foreground">R$ {p.price.toFixed(2)}</p>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="hidden md:flex" />
                                <CarouselNext className="hidden md:flex" />
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
