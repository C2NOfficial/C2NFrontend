import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	limit,
	orderBy,
	query,
	QueryDocumentSnapshot,
	serverTimestamp,
	startAfter,
	updateDoc,
	where,
} from "firebase/firestore";
import { slugify } from "../../utils/random_helpers.ts";
import type { FetchProductsResult, Product, ProductForm } from "./model.ts";
import { COLLECTION_NAMES } from "../../firebase/firestore_collection_names.ts";
import { firestoreDb } from "../../firebase/init.ts";
import type { Category } from "../categories/model.ts";
import { fetchCategoryFromFirestore } from "../categories/service.ts";

async function createProductInFirestore(product: ProductForm) {
	try {
		const q = query(
			collection(firestoreDb, COLLECTION_NAMES.Products),
			where("name", "==", product.name),
		);
		const querySnapshot = await getDocs(q);

		if (!querySnapshot.empty) {
			throw new Error(
				`Product with name "${product.name}" already exists`,
			);
		}
		if (!product.category) {
			throw new Error("Category is required");
		}
		const docRef = await addDoc(
			collection(firestoreDb, COLLECTION_NAMES.Products),
			{
				name: product.name,
				slug: slugify(product.name),
				description: product.description,
				categoryId: product.category.id,
				tags: product.tags,
				mrp: product.mrp,
				media: product.media,
				sellingPrice: product.sellingPrice,
				costToMake: product.costToMake,
				quantity: product.quantity,
				sku: product.sku,
				allowOutOfStockPurchase: product.allowOutOfStockPurchase,
				weight: product.weight,
				height: product.height,
				width: product.width,
				length: product.length,
				materials: product.materials,
				careGuide: product.careGuide,
				deliveryPaymentReturnInfo: product.deliveryPaymentReturnInfo,
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
			},
		);
		return docRef.id;
	} catch (error) {
		throw error;
	}
}

async function fetchProductsFromFirestore(
	lastDoc?: QueryDocumentSnapshot,
): Promise<FetchProductsResult> {
	const pageSize = 10;
	const baseQuery = query(
		collection(firestoreDb, COLLECTION_NAMES.Products),
		orderBy("createdAt", "desc"),
		limit(pageSize),
	);

	const paginatedQuery = lastDoc
		? query(baseQuery, startAfter(lastDoc))
		: baseQuery;

	const snapshot = await getDocs(paginatedQuery);
	return {
		products: snapshot.docs.map((doc) => ({
			id: doc.id,
			name: doc.data().name,
			slug: doc.data().slug,
			description: doc.data().description,
			category: {
				id: doc.data().categoryId,
			} as Category,
			tags: doc.data().tags,
			mrp: doc.data().mrp,
			media: doc.data().media,
			sellingPrice: doc.data().sellingPrice,
			costToMake: doc.data().costToMake,
			quantity: doc.data().quantity,
			sku: doc.data().sku,
			allowOutOfStockPurchase: doc.data().allowOutOfStockPurchase,
			weight: doc.data().weight,
			height: doc.data().height,
			width: doc.data().width,
			length: doc.data().length,
			materials: doc.data().materials,
			careGuide: doc.data().careGuide,
			deliveryPaymentReturnInfo: doc.data().deliveryPaymentReturnInfo,
			createdAt: doc.data().createdAt,
			updatedAt: doc.data().updatedAt,
		})),
		lastDoc: snapshot.docs[snapshot.docs.length - 1] ?? null,
	};
}

async function deleteProductInFirestore(id: string) {
	try {
		const docRef = doc(firestoreDb, COLLECTION_NAMES.Products, id);
		await deleteDoc(docRef);
	} catch (error) {
		throw error;
	}
}

async function updateProductInFirestore(product: ProductForm) {
	try {
		if (!product.id) {
			throw new Error("Product id is required");
		}
		if (!product.category) {
			throw new Error("Category is required");
		}
		const docRef = doc(firestoreDb, COLLECTION_NAMES.Products, product.id);
		if (!product.category) {
			throw new Error("Category is required");
		}
		await updateDoc(docRef, {
			name: product.name,
			slug: product.slug,
			description: product.description,
			categoryId: product.category.id,
			tags: product.tags,
			media: product.media,
			mrp: product.mrp,
			sellingPrice: product.sellingPrice,
			costToMake: product.costToMake,
			quantity: product.quantity,
			sku: product.sku,
			allowOutOfStockPurchase: product.allowOutOfStockPurchase,
			weight: product.weight,
			height: product.height,
			width: product.width,
			length: product.length,
			materials: product.materials,
			careGuide: product.careGuide,
			deliveryPaymentReturnInfo: product.deliveryPaymentReturnInfo,
			updatedAt: serverTimestamp(),
		});
	} catch (error) {
		throw error;
	}
}

async function fetchProductFromSlug(slug: string): Promise<Product> {
	try {
		const q = query(
			collection(firestoreDb, COLLECTION_NAMES.Products),
			where("slug", "==", slug),
		);
		const querySnapshot = await getDocs(q);
		if (querySnapshot.empty) {
			throw new Error("Product not found");
		}
		const docSnap = querySnapshot.docs[0];
		const itemCategory = await fetchCategoryFromFirestore(
			docSnap.data().categoryId,
		);
		return {
			id: docSnap.id,
			category: itemCategory,
			...docSnap.data(),
		} as Product;
	} catch (error) {
		throw error;
	}
}

export {
	createProductInFirestore,
	fetchProductsFromFirestore,
	deleteProductInFirestore,
	updateProductInFirestore,
	fetchProductFromSlug,
};
