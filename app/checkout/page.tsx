"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Trash, CaretLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const { items, removeFromCart, total } = useCart();
    const router = useRouter();

    const handleCheckout = () => {
        // Mock payment processing
        setTimeout(() => {
            router.push("/checkout/success");
        }, 1500);
    };

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center space-y-4">
                <h1 className="text-2xl font-bold">Your cart is empty</h1>
                <Link href="/" className="text-primary hover:underline">
                    Go to Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
                <CaretLeft /> Back to Shop
            </Link>

            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-8">Checkout</h1>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Cart Items */}
                <div className="space-y-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4 border p-4 rounded-lg bg-card">
                            <div className="relative h-24 w-24 rounded-md overflow-hidden bg-muted border shrink-0">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h4 className="font-bold uppercase">{item.name}</h4>
                                    <p className="text-sm text-muted-foreground">Color: <span className="capitalize">{item.color}</span></p>
                                    <p className="text-sm text-primary font-mono mt-1">"{item.customText}"</p>
                                    <div className="text-[10px] text-muted-foreground mt-1 space-x-2">
                                        <span>Size: {item.textConfig.fontSize}</span>
                                        <span>X: {item.textConfig.position.x}</span>
                                        <span>Y: {item.textConfig.position.y}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-bold">R$ {item.price.toFixed(2)}</span>
                                    <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive">
                                        <Trash size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="bg-stone-50 dark:bg-stone-900 p-8 rounded-lg h-fit space-y-6">
                    <h3 className="text-xl font-bold uppercase tracking-wide">Order Summary</h3>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>R$ {total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Shipping</span>
                            <span className="text-green-600 font-bold">FREE</span>
                        </div>
                    </div>

                    <div className="border-t pt-4 flex justify-between font-bold text-xl">
                        <span>Total</span>
                        <span>R$ {total.toFixed(2)}</span>
                    </div>

                    <Button onClick={handleCheckout} size="lg" className="w-full text-lg h-14 font-bold uppercase tracking-widest">
                        Pay Now
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                        This is a mock checkout. No real payment will be processed.
                    </p>
                </div>
            </div>
        </div>
    );
}
