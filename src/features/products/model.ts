import type { QueryDocumentSnapshot } from "firebase/firestore";
import { type Category } from "../categories/model";

interface ProductForm {
	id?: string;
	name: string;
	slug: string;
	description: string;
	category: Category | undefined;
	tags: string[];
	media: MediaItem[];
	mrp: number;
	sellingPrice: number;
	costToMake: number;
	quantity: number;
	sku: string;
	allowOutOfStockPurchase: boolean;
	weight: number;
	height: number;
	width: number;
	length: number;
	materials: string;
	careGuide: string;
	deliveryPaymentReturnInfo: string;
}

export const defaultProductForm: ProductForm = {
	name: "",
	slug: "",
	category: undefined,
	description: "",
	tags: [],
	media: [],
	mrp: 0,
	sellingPrice: 0,
	costToMake: 0,
	quantity: 0,
	sku: "",
	allowOutOfStockPurchase: false,
	weight: 0,
	height: 0,
	width: 0,
	length: 0,
	materials: "",
	careGuide: "",
	deliveryPaymentReturnInfo: "",
};

interface MediaItem{
	url: string;
	type: "image" | "video";
}

interface Product {
	readonly id: string;
	name: string;
	slug: string;
	description: string;
	category: Category;
	tags: string[];
	media: MediaItem[];
	mrp: number;
	sellingPrice: number;
	costToMake: number;
	quantity: number;
	sku: string;
	allowOutOfStockPurchase: boolean;
	weight: number;
	height: number;
	width: number;
	length: number;
	materials: string;
	careGuide: string;
	deliveryPaymentReturnInfo: string;
	createdAt: Date;
	updatedAt: Date;
}

interface ProductErrors {
	productName: string;
	productDescription: string;
	productCategory: string;
	productTags: string;
	media: string;
	mrp: string;
	sellingPrice: string;
	costToMake: string;
	quantity: string;
	sku: string;
	weight: string;
	height: string;
	width: string;
	length: string;
	materials: string;
	careGuide: string;
	deliveryPaymentReturnInfo: string;
}

export const defaultProductFormErrors: ProductErrors = {
	productName: "",
	productDescription: "",
	productCategory: "",
	productTags: "",
	media: "",
	mrp: "",
	sellingPrice: "",
	costToMake: "",
	quantity: "",
	sku: "",
	weight: "",
	height: "",
	width: "",
	length: "",
	materials: "",
	careGuide: "",
	deliveryPaymentReturnInfo: "",
};

interface ProductDialogViewValidators {
	validateBasicInfo: () => boolean;
	validateMedia: () => boolean;
	validatePricing: () => boolean;
	validateInventory: () => boolean;
	validateShipping: () => boolean;
	validateAdditionalInfo: () => boolean;
}

interface AddProductDialogViewsProps {
	product: ProductForm;
	setProduct: React.Dispatch<React.SetStateAction<ProductForm>>;
	errors: ProductErrors;
}

interface FetchProductsResult {
	products: Product[];
	lastDoc: QueryDocumentSnapshot | null;
}

interface ProductFilters{
	searchText: string;
}

export type {
	ProductForm,
	Product,
	MediaItem,
	ProductErrors,
	ProductDialogViewValidators,
	AddProductDialogViewsProps,
	FetchProductsResult,
	ProductFilters
};
