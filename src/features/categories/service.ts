import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
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
import type { Category, CategoryForm, FetchCategoriesResult } from "./model";
import { firestoreDb } from "../../firebase/init";
import { COLLECTION_NAMES } from "../../firebase/firestore_collection_names";
import { slugify } from "../../utils/random_helpers";
import { toast } from "react-toastify";


/**
 * Converts size chart from string[][] to { size: string; value: string }[]
 * Firebase does not accept string[][]. Need to convert it to { size: string; value: string }[]
 */
function toFirestoreSizeChart(sizeChart: string[][]) {
	return sizeChart.map((row) => ({ row }));
}

function fromFirestoreSizeChart(sizeChart: { row: string[] }[]): string[][] {
	return sizeChart.map((r) => r.row);
}

function validateCategoryName(category: CategoryForm) {
	if (category.name.length === 0) {
		toast.error("Category name is required");
		return false;
	}
	return true;
}

async function createCategoryInFirestore(category: CategoryForm) {
	try {
		const q = query(
			collection(firestoreDb, COLLECTION_NAMES.Categories),
			where("name", "==", category.name),
		);

		const querySnapshot = await getDocs(q);

		if (!querySnapshot.empty) {
			throw new Error(
				`Category with name "${category.name}" already exists`,
			);
		}
		const docRef = await addDoc(
			collection(firestoreDb, COLLECTION_NAMES.Categories),
			{
				name: category.name,
				slug: slugify(category.name),
				sizeChart: toFirestoreSizeChart(category.sizeChart),
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
			},
		);
		return docRef.id;
	} catch (error) {
		throw error;
	}
}

async function fetchCategoriesFromFirestore(
	lastDoc?: QueryDocumentSnapshot,
): Promise<FetchCategoriesResult> {
	try {
		const pageSize = 10;
		const baseQuery = query(
			collection(firestoreDb, COLLECTION_NAMES.Categories),
			orderBy("createdAt", "desc"),
			limit(pageSize),
		);

		const paginatedQuery = lastDoc
			? query(baseQuery, startAfter(lastDoc))
			: baseQuery;

		const snapshot = await getDocs(paginatedQuery);
		return {
			categories: snapshot.docs.map((doc) => ({
				id: doc.id,
				name: doc.data().name,
				slug: doc.data().slug,
				sizeChart: fromFirestoreSizeChart(doc.data().sizeChart),
				createdAt: doc.data().createdAt,
				updatedAt: doc.data().updatedAt,
			})),
			lastDoc: snapshot.docs[snapshot.docs.length - 1] ?? null,
		};
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function fetchCategoryFromFirestore(id: string): Promise<Category> {
	try {
		const ref = doc(firestoreDb, COLLECTION_NAMES.Categories, id);
		const docSnap = await getDoc(ref);
		if (!docSnap.exists()) {
			throw new Error("Category not found");
		}
		return {
			id: docSnap.id,
			name: docSnap.data().name,
			slug: docSnap.data().slug,
			sizeChart: fromFirestoreSizeChart(docSnap.data().sizeChart),
			createdAt: docSnap.data().createdAt,
			updatedAt: docSnap.data().updatedAt,
		} as Category;
	} catch (error) {
		throw error;
	}
}

async function deleteCategoryFromFirestore(id: string) {
	try {
		const q = query(
			collection(firestoreDb, COLLECTION_NAMES.Products),
			where("categoryId", "==", id),
		);
		const querySnapshot = await getDocs(q);
		if (querySnapshot.docs.length > 0) {
			throw new Error(
				`Category cannot be deleted as it is in use. Either delete those products or move them to another category`,
			);
		}
		await deleteDoc(doc(firestoreDb, COLLECTION_NAMES.Categories, id));
	} catch (error) {
		throw error;
	}
}

async function updateCategoryInFirestore(category: CategoryForm) {
	try {
		if (!category.id) {
			throw new Error("Category id is required");
		}
		const docRef = doc(
			firestoreDb,
			COLLECTION_NAMES.Categories,
			category.id,
		);
		await updateDoc(docRef, {
			name: category.name,
			sizeChart: toFirestoreSizeChart(category.sizeChart),
			slug: slugify(category.name),
			updatedAt: serverTimestamp(),
		});
	} catch (error) {
		throw error;
	}
}

export {
	createCategoryInFirestore,
	fetchCategoriesFromFirestore,
	validateCategoryName,
	deleteCategoryFromFirestore,
	updateCategoryInFirestore,
	fetchCategoryFromFirestore,
};
