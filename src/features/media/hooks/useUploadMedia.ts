import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useLoadingOverlay } from "../../../context/LoadingOverlay";
import { handleFirebaseError } from "../../../firebase/errors";
import type { MediaUpload } from "../model";
import { uploadMediaToStorage } from "../service";

const useUploadMedia = () => {
	const { showLoading, hideLoading } = useLoadingOverlay();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (media: MediaUpload ) => {
			await uploadMediaToStorage(media);
		},
		onMutate: () => {
			showLoading();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["media"] });
			toast.success("Media uploaded successfully");
		},
		onError: (error: any) => {
			toast.error(handleFirebaseError(error));
		},
		onSettled: () => {
			hideLoading();
		},
	});

	return {
		uploadMedia: mutation.mutateAsync,
	};
};

export default useUploadMedia;
