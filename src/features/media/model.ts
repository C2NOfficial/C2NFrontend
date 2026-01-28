import type React from "react";
import type { MediaItem } from "../products/model";

interface MediaUpload {
	images: File[];
	videos: File[];
}

interface MediaPageTokens {
	images?: string;
	videos?: string;
}

interface MediaFetchedResponse {
	images: string[];
	videos: string[];
	nextPageTokens: MediaPageTokens;
}

interface MediaFlattened {
	images: string[];
	videos: string[];
}

interface SelectMediaDialogProps {
	dialogRef: React.RefObject<HTMLDialogElement | null> ;
	onSelect: (media: MediaItem[]) => void;
	selectedMedia: MediaItem[];
	setSelectedMedia: React.Dispatch<React.SetStateAction<MediaItem[]>>;
}

export type {
	MediaUpload,
	MediaPageTokens,
	MediaFetchedResponse,
	MediaFlattened,
	SelectMediaDialogProps,
};
