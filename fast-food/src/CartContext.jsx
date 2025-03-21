import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        try {
            const parsedCart = savedCart ? JSON.parse(savedCart) : [];
            if (!Array.isArray(parsedCart)) {
                console.error("Cart in localStorage is not an array:", parsedCart);
                return [];
            }
            return parsedCart;
        } catch (error) {
            console.error("Error parsing cart from localStorage:", error);
            return [];
        }
    });

    const [showCart, setShowCart] = useState(false);

    const updateCart = (newCart) => {
        if (!Array.isArray(newCart)) {
            console.error("Attempted to set cart to a non-array value:", newCart);
            return;
        }
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };
    
    const handleAddToCart = (item) => {
        if (!Array.isArray(cart)) {
            console.error("Cart is not an array:", cart);
            return;
        }

        const itemInCart = cart.find((cartItem) => cartItem.id === item.id);
        if (itemInCart) {
            const updatedCart = cart.map((cartItem) =>
                cartItem.id === item.id ? { ...cartItem, amount: cartItem.amount + 1 } : cartItem
            );
            updateCart(updatedCart);
        } else {
            updateCart([...cart, { ...item, amount: 1 }]);
        }
    };

    const handleRemoveFromCart = (id) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        updateCart(updatedCart);
    };

    const handleChangeQuantity = (id, delta) => {
        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, amount: Math.max(1, item.amount + delta) } : item
        );
        updateCart(updatedCart);
    };

    const totalPrice = Array.isArray(cart) ? cart.reduce((total, item) => total + item.price * item.amount, 0) : 0;

    useEffect(() => {
        console.log("Cart updated:", cart);
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, showCart, setShowCart, handleAddToCart, handleRemoveFromCart, handleChangeQuantity, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};