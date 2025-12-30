import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/data";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            <section className="flex-1 flex flex-col items-center justify-start text-center p-4 py-8 md:py-16 space-y-8 md:space-y-12 bg-stone-950 text-stone-50">
                <div className="space-y-4 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
                        Design <span className="text-primary">Your Flame</span>
                    </h1>
                    <p className="text-lg md:text-xl text-stone-400 font-medium tracking-tight max-w-2xl mx-auto">
                        Hyper-customizable 3D printed accessories. Engineered for the future.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl px-4 md:px-8">
                    {PRODUCTS.map((product) => (
                        <Card key={product.id} className="bg-stone-900 border-stone-800 overflow-hidden flex flex-col hover:border-primary/50 transition-colors group">
                            <CardHeader className="p-0">
                                <div className="relative w-full aspect-square bg-gradient-to-b from-stone-800 to-stone-900">
                                    <div className="absolute inset-0 flex items-center justify-center text-stone-800">
                                        <span className="font-bold text-6xl select-none opacity-20">3DGE</span>
                                    </div>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 flex-1 text-left space-y-2">
                                <CardTitle className="text-white text-xl font-bold uppercase tracking-wide">{product.name}</CardTitle>
                                <p className="text-stone-400 text-sm line-clamp-2">{product.description}</p>
                                <p className="text-primary font-bold text-lg pt-2">R$ {product.price.toFixed(2)}</p>
                            </CardContent>
                            <CardFooter className="p-6 pt-0">
                                <Link href={`/studio/${product.slug}`} className={buttonVariants({ className: "w-full font-bold uppercase tracking-wider bg-white text-black hover:bg-primary hover:text-black transition-colors" })}>
                                    Customize
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}