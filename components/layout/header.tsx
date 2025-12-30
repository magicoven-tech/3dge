"use client";

import Link from "next/link";
import { CartSheet } from "@/components/cart/cart-sheet";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-2xl font-black tracking-tighter hover:text-primary transition-colors">
                    3DGE
                </Link>
                <CartSheet />
            </div>
        </header>
    );
}
