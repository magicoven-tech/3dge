"use client";

import { ShoppingBag, Trash } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area"; // Removed to avoid dependency
import { Separator } from "@/components/ui/separator";

export function CartSheet() {
    const { items, removeFromCart, total } = useCart();

    return (
        <Sheet>
            <SheetTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "relative text-foreground hover:text-primary transition-colors" })}>
                <ShoppingBag size={24} weight="regular" />
                {items.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                        {items.length}
                    </span>
                )}
            </SheetTrigger>
            <SheetContent className="flex flex-col h-full bg-background border-l border-border w-[90%] sm:max-w-[400px]">
                <SheetHeader>
                    <SheetTitle className="text-xl font-bold tracking-tight">YOUR FLAME</SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
                            <ShoppingBag size={48} weight="thin" />
                            <p>Your cart is empty.</p>
                            <Button variant="outline" className="mt-4">
                                Start Customizing
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative h-20 w-20 rounded-md overflow-hidden bg-muted border border-border shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h4 className="font-medium uppercase text-sm">{item.name}</h4>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Color: <span className="capitalize">{item.color}</span>
                                            </p>
                                            {item.customText && (
                                                <p className="text-xs text-primary mt-1 font-mono">
                                                    "{item.customText}"
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-sm font-semibold">${item.price.toFixed(2)}</span>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-muted-foreground hover:text-destructive transition-colors"
                                            >
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="pt-6 border-t border-border">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span className="font-bold text-lg">${total.toFixed(2)}</span>
                        </div>
                        <Link href="/checkout" className="w-full">
                            <Button className="w-full text-base py-6 font-bold tracking-wide" size="lg">
                                CHECKOUT
                            </Button>
                        </Link>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
