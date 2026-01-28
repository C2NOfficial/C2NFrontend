import React, { createContext, useContext, useEffect, useState } from "react";
import type { WishlistItem } from "../features/wishlist/model";
import useFetchWishlist from "../features/wishlist/hooks/useFetchWishlist";
import useFetchProducts from "../features/products/hooks/useFetchProducts";

interface WishlistContextType {
	wishlist: WishlistItem[];
	isFetchingWishlist: boolean;
	refreshWishlist: () => Promise<void>;
	setWishlist: React.Dispatch<React.SetStateAction<WishlistItem[]>>;
}

const CartContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
	const { data: products } = useFetchProducts();
	const { fetchWishlist, isFetchingWishlist } = useFetchWishlist({
		products,
	});

	const refreshWishlist = async () =>
		fetchWishlist().then((wishlist) => setWishlist(wishlist));

	useEffect(() => {
		if (products) refreshWishlist();
	}, [products, fetchWishlist]);

	return (
		<CartContext.Provider
			value={{
				wishlist,
				isFetchingWishlist,
				refreshWishlist,
				setWishlist,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useWishlistContext = (): WishlistContextType => {
	const ctx = useContext(CartContext);
	if (!ctx) {
		throw new Error(
			"useWishlistContext must be used inside WishlistProvider",
		);
	}
	return ctx;
};
