import type { Product } from "../products/model";

interface WishlistItem{
	id: string; //product id
	inStock: boolean;
	product: Product;
	updatedAt: Date;
}

export type {WishlistItem}