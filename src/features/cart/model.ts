import type { Product } from "../products/model";

interface CartItem{
	id: string; //Unique id `${productId}_${size}`
	productId: string; 
	product: Product //Optional product object
	categoryId: string;
	quantity: number;
	price: number;
	size: string;
}

export type { CartItem }