import {
	deleteObject,
	getDownloadURL,
	listAll,
	ref,
	uploadBytes,
} from "firebase/storage";
import { storage } from "./init";

async function uploadFilesToFirestoreStorage(
	files: File[],
	folderPath: string,
): Promise<string[]> {
	try {
		const uploadPromises = files.map(async (file) => {
			const fileRef = ref(
				storage,
				`${folderPath}/${Date.now()}-${file.name}`,
			);

			await uploadBytes(fileRef, file);
			return await getDownloadURL(fileRef);
		});

		return await Promise.all(uploadPromises);
	} catch (error) {
		throw error;
	}
}


async function deletePathFromStorage(path: string) {
	try {
		const pathRef = ref(storage, path);
		const allItems = await listAll(pathRef);
		await Promise.all(
			allItems.items.map(async (item) => {
				deleteObject(item);
			}),
		);
		for (const folderRef of allItems.prefixes) {
			await deletePathFromStorage(folderRef.fullPath);
		}
	} catch (error) {
		throw error;
	}
}

export { uploadFilesToFirestoreStorage, deletePathFromStorage };
