"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS } from "@/lib/data";

// Define the shape of a cart item
export type CartItem = {
    id: string; // Unique ID for the cart entry (e.g. timestamp + product id)
    productId: string;
    name: string;
    price: number;
    image: string;
    customText: string;
    color: string;
};

type CartContextType = {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, "id">) => void;
    removeFromCart: (id: string) => void;
    total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // TODO: Load from local storage if needed
    }, []);

    const addToCart = (newItem: Omit<CartItem, "id">) => {
        const item: CartItem = {
            ...newItem,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        };
        setItems((prev) => [...prev, item]);
    };

    const removeFromCart = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const total = items.reduce((acc, item) => acc + item.price, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, total }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
