import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	serverTimestamp,
	setDoc,
	writeBatch,
} from "firebase/firestore";
import type { WishlistItem } from "./model";
import { firestoreDb } from "../../firebase/init";
import { COLLECTION_NAMES } from "../../firebase/firestore_collection_names";

async function addToWishlistInFirestore(uid: string, item: WishlistItem) {
	try {
		const docRef = doc(
			firestoreDb,
			COLLECTION_NAMES.Users,
			uid,
			COLLECTION_NAMES.Wishlist,
			item.id,
		);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			throw new Error(
				"You have already added this item to your wishlist",
			);
		}
		await setDoc(
			docRef,
			{
				updatedAt: serverTimestamp(),
			},
			{ merge: true },
		);
	} catch (error) {
		throw error;
	}
}

async function fetchFromWishlistFromFirestore(
	uid: string,
): Promise<WishlistItem[]> {
	try {
		const wishlistColRef = collection(
			firestoreDb,
			COLLECTION_NAMES.Users,
			uid,
			COLLECTION_NAMES.Wishlist,
		);
		const wishlistSnapshot = await getDocs(wishlistColRef);
		return wishlistSnapshot.docs.map(
			(doc) =>
				({
					id: doc.id,
					updatedAt: doc.data().updatedAt,
				}) as WishlistItem,
		);
	} catch (error) {
		throw error;
	}
}

async function removeFromWishlistInFirestore(uid: string, item: WishlistItem) {
	try {
		const docRef = doc(
			firestoreDb,
			COLLECTION_NAMES.Users,
			uid,
			COLLECTION_NAMES.Wishlist,
			item.id,
		);
		await deleteDoc(docRef);
	} catch (error) {
		throw error;
	}
}

async function clearWishlistInFirestore(uid: string) {
	try {
		const wishlistRef = collection(
			firestoreDb,
			COLLECTION_NAMES.Users,
			uid,
			COLLECTION_NAMES.Wishlist,
		);
		const snapshot = await getDocs(wishlistRef);

		if (snapshot.empty) return; // nothing to delete

		const batch = writeBatch(firestoreDb);
		snapshot.docs.forEach((doc) => batch.delete(doc.ref));

		await batch.commit();
	} catch (error) {
		throw error;
	}
}

export {
	addToWishlistInFirestore,
	fetchFromWishlistFromFirestore,
	removeFromWishlistInFirestore,
	clearWishlistInFirestore,
};
