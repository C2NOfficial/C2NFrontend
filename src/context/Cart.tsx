import React, { createContext, useContext, useEffect, useState } from "react";
import type { CartItem } from "../features/cart/model";
import useFetchCartItems from "../features/cart/hooks/useFetchCartItems";
import useFetchProducts from "../features/products/hooks/useFetchProducts";

interface CartContextType {
	cart: CartItem[];
	isFetching: boolean;
	refreshCart: () => Promise<void>;
	setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const [cart, setCart] = useState<CartItem[]>([]);
	const { data: products } = useFetchProducts();
	const { fetchCartItems, isFetching } = useFetchCartItems({ products });

	const refreshCart = async () =>
		fetchCartItems().then((data) => setCart(data));

	useEffect(() => {
		if (products) refreshCart();
	}, [products, fetchCartItems]);

	return (
		<CartContext.Provider
			value={{ cart, isFetching, refreshCart, setCart }}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCartContext = (): CartContextType => {
	const ctx = useContext(CartContext);
	if (!ctx) {
		throw new Error("useCartContext must be used inside CartProvider");
	}
	return ctx;
};
