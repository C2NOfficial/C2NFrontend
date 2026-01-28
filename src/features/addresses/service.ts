import {
	collection,
	deleteDoc,
	doc,
	getDocs,
} from "firebase/firestore";
import { COLLECTION_NAMES } from "../../firebase/firestore_collection_names";
import type { Address } from "./model";
import { firestoreDb } from "../../firebase/init";
import type { FailureApiResponse } from "../../constants/response";

async function addAddressToFirestore(
	token: string,
	address: Address,
): Promise<void> {
	try {
		const response = await fetch(import.meta.env.VITE_ADD_ADDRESS_URL, {
			method: "POST", 
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(address)
		})	
		if (!response.ok) {
			const responseJSON: FailureApiResponse = await response.json();
			throw new Error(responseJSON.message);
		}
	} catch (error) {
		throw error;
	}
}

async function fetchAddressesFromFirestore(uid: string): Promise<Address[]> {
	try {
		const querySnapshot = await getDocs(
			collection(
				firestoreDb,
				COLLECTION_NAMES.Users,
				uid,
				COLLECTION_NAMES.Addresses,
			),
		);
		if (querySnapshot.empty) {
			return [];
		}
		return querySnapshot.docs.map((doc) => {
			return {
				id: doc.id,
				...doc.data(),
			} as Address;
		});
	} catch (error) {
		throw error;
	}
}

async function updateAddressInFirestore(
	token: string,
	address: Address,
): Promise<void> {
	try {
		const response = await fetch(import.meta.env.VITE_UPDATE_ADDRESS_URL, {
			method: "PUT", 
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(address)
		})	
		if (!response.ok) {
			const responseJSON: FailureApiResponse = await response.json();
			throw new Error(responseJSON.message);
		}
	} catch (error) {
		throw error;
	}
}

async function deleteAddressInFirestore(
	uid: string,
	addressID: string,
): Promise<void> {
	try {
		const docRef = doc(
			firestoreDb,
			COLLECTION_NAMES.Users,
			uid,
			COLLECTION_NAMES.Addresses,
			addressID,
		);
		await deleteDoc(docRef);
	} catch (error) {
		throw error;
	}
}

export {
	addAddressToFirestore,
	fetchAddressesFromFirestore,
	updateAddressInFirestore,
	deleteAddressInFirestore,
};
