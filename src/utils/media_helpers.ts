import type {
	FailureApiResponse,
} from "../constants/response";

type MediaType = typeof MEDIA_TYPE[keyof typeof MEDIA_TYPE];

interface mediaMetaData {
	id: number;
	mediaIDType: MediaType;
}

export const MEDIA_TYPE = {
	PRODUCT: "products",
} as const;

/**
 * Uploads one or more image files to the specified endpoint.
 *
 * @param file - A single File or an array of Files to upload
 * @param metaData - Metadata to be attached to the image.
 * @returns The Fetch API Response object (if successful, returns the array of the uploaded image URLs)
 * @throws Error when the API response is not OK
 */
async function uploadImage(
	file: File[],
	metaData: mediaMetaData,
): Promise<void> {
	try {
		const formData = new FormData();
		for (let i = 0; i < file.length; i++) {
			formData.append("images", file[i]);
		}
		formData.append("metadata", JSON.stringify(metaData));
		const response = await fetch(import.meta.env.VITE_IMAGE_UPLOAD_URL, {
			method: "POST",
			body: formData,
			credentials: "include",
		});
		if (!response.ok) {
			const errorResponse: FailureApiResponse = await response.json();
			throw new Error(errorResponse.message);
		}
	} catch (error) {
		throw error;
	}
}

/**
 * Uploads one or more video files to the specified endpoint.
 *
 * @param file - A single File or an array of Files to upload
 * @param metaData - Metadata to be attached to the video.
 * @returns The Fetch API Response object (if successful, returns the url of the uploaded video)
 * @throws Error when the API response is not OK
 */
async function uploadVideo(
	file: File,
	metaData: mediaMetaData,
): Promise<void> {
	try {
		const formData = new FormData();
		formData.append("video", file);
		formData.append("metadata", JSON.stringify(metaData));
		const response = await fetch(import.meta.env.VITE_VIDEO_UPLOAD_URL, {
			method: "POST",
			body: formData,
			credentials: "include",
		});
		if (!response.ok) {
			const errorResponse: FailureApiResponse = await response.json();
			throw new Error(errorResponse.message);
		}
	} catch (error) {
		throw error;
	}
}

export { uploadImage, uploadVideo };
export type { mediaMetaData, MediaType};