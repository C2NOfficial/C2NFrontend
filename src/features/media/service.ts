import { getDownloadURL, list, ref } from "firebase/storage";
import { uploadFilesToFirestoreStorage } from "../../firebase/helpers";
import type {
	MediaUpload,
	MediaFetchedResponse,
	MediaPageTokens,
} from "./model";
import { storage } from "../../firebase/init";

const MAX_MEDIA_FETCH_SIZE = 100;

async function uploadMediaToStorage(media: MediaUpload): Promise<void> {
	try {
		await Promise.all([
			uploadFilesToFirestoreStorage(media.images, `media/images`),
			uploadFilesToFirestoreStorage(media.videos, `media/videos`),
		]);
	} catch (error) {
		throw error;
	}
}

async function fetchMediaFolder(
	folder: "images" | "videos",
	pageToken?: string,
) {
	const folderRef = ref(storage, `media/${folder}`);

	const result = await list(folderRef, {
		maxResults: MAX_MEDIA_FETCH_SIZE,
		pageToken,
	});

	return {
		items: result.items,
		nextPageToken: result.nextPageToken,
	};
}

export async function fetchMediaInParallel(
	tokens: MediaPageTokens,
): Promise<MediaFetchedResponse> {
	const [imagesRes, videosRes] = await Promise.all([
		fetchMediaFolder("images", tokens.images),
		fetchMediaFolder("videos", tokens.videos),
	]);
	const imageUrls = await Promise.all(
		imagesRes.items.map((ref) => getDownloadURL(ref)),
	);
	const videoUrls = await Promise.all(
		videosRes.items.map((ref) => getDownloadURL(ref)),
	);

	return {
		images: imageUrls,
		videos: videoUrls,
		nextPageTokens: {
			images: imagesRes.nextPageToken,
			videos: videosRes.nextPageToken,
		},
	};
}

export { uploadMediaToStorage, fetchMediaFolder };
