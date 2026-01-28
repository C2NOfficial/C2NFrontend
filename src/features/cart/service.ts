import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	writeBatch,
} from "firebase/firestore";
import { firestoreDb } from "../../firebase/init";
import { COLLECTION_NAMES } from "../../firebase/firestore_collection_names";
import type { CartItem } from "./model";
import { LOCAL_STORAGE_KEYS } from "../../constants/browser_storage_keys";
import type { Product } from "../products/model";

async function fetchCartItemsFromFirestore(uid: string): Promise<CartItem[]> {
	try {
		const colRef = collection(
			firestoreDb,
			COLLECTION_NAMES.Users,
			uid,
			COLLECTION_NAMES.Cart,
		);
		const response = await getDocs(colRef);
		if (response.empty) {
			return [];
		}
		return response.docs.map(
			(doc) => ({ id: doc.id, ...doc.data() }) as CartItem,
		);
	} catch (error) {
		throw error;
	}
}

function fetchCartItemsFromLocalStorage(): CartItem[] {
	return JSON.parse(
		localStorage.getItem(LOCAL_STORAGE_KEYS.CART_ITEMS) || "[]",
	);
}

async function saveCartItemsToFirestore(uid: string, cartItems: CartItem[]) {
	try {
		const batch = writeBatch(firestoreDb);
		cartItems.forEach((item) => {
			const itemRef = doc(
				firestoreDb,
				COLLECTION_NAMES.Users,
				uid,
				COLLECTION_NAMES.Cart,
				item.id,
			);
			batch.set(
				itemRef,
				{
					quantity: item.quantity,
					size: item.size,
					productId: item.productId,
					categoryId: item.categoryId,
				},
				{ merge: true },
			);
		});
		await batch.commit();
	} catch (error) {
		throw error;
	}
}

function saveCartItemsToLocalStorage(cartItems: CartItem[]) {

	const prevItems = fetchCartItemsFromLocalStorage();

	const cartMap = new Map(prevItems.map((item) => [item.id, item]));

	for (const item of cartItems) {
		cartMap.set(item.id, item);
	}

	const mergedCartItems = Array.from(cartMap.values());

	localStorage.setItem(
		LOCAL_STORAGE_KEYS.CART_ITEMS,
		JSON.stringify(mergedCartItems),
	);
}

async function removeCartItemFromFirestore(uid: string, itemID: string) {
	try {
		const docRef = doc(
			firestoreDb,
			COLLECTION_NAMES.Users,
			uid,
			COLLECTION_NAMES.Cart,
			itemID,
		);
		const docSnapshot = await getDoc(docRef);
		if (docSnapshot.exists()) {
			await deleteDoc(docRef);
		}
	} catch (error) {
		throw error;
	}
}

function removeCartItemFromLocalStorage(itemID: string) {
	const cartItems = JSON.parse(
		localStorage.getItem(LOCAL_STORAGE_KEYS.CART_ITEMS) || "[]",
	);
	const newCartItems = cartItems.filter(
		(item: CartItem) => item.id !== itemID,
	);
	localStorage.setItem(
		LOCAL_STORAGE_KEYS.CART_ITEMS,
		JSON.stringify(newCartItems),
	);
}

async function clearCartFromFirestore(uid: string) {
	try {
		const colRef = collection(
			firestoreDb,
			COLLECTION_NAMES.Users,
			uid,
			COLLECTION_NAMES.Cart,
		);
		const docSnapshots = await getDocs(colRef);
		const deletedPromises = docSnapshots.docs.map(async (docSnapshot) => {
			await deleteDoc(docSnapshot.ref);
		});
		await Promise.all(deletedPromises);
	} catch (error) {
		throw error;
	}
}

function clearCartFromLocalStorage() {
	localStorage.removeItem(LOCAL_STORAGE_KEYS.CART_ITEMS);
}

function mapEachProductToCartItem(
	products: Product[] | undefined,
	cartItems: CartItem[],
): CartItem[] {
	if (!products) return cartItems;
	return cartItems.map((cartItem) => {
		const product = products?.find((p) => p.id === cartItem.productId);
		if (product) cartItem.product = product;
		return cartItem;
	});
}

export {
	fetchCartItemsFromFirestore,
	saveCartItemsToFirestore,
	removeCartItemFromFirestore,
	clearCartFromFirestore,
	fetchCartItemsFromLocalStorage,
	saveCartItemsToLocalStorage,
	removeCartItemFromLocalStorage,
	clearCartFromLocalStorage,
	mapEachProductToCartItem,
};
