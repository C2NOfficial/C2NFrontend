import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useLoadingOverlay } from "../../../context/LoadingOverlay";
import { deleteCategoryFromFirestore } from "../service";
import { handleFirebaseError } from "../../../firebase/errors";

const useDeleteCategory = () => {
	const { showLoading, hideLoading } = useLoadingOverlay();

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (id: string) => {
			return await deleteCategoryFromFirestore(id);
		},
		onMutate: () => {
			showLoading();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			toast.success("Category created successfully");
		},
		onError: (error: any) => {
			toast.error(handleFirebaseError(error));
		},
		onSettled: () => {
			hideLoading();
		},
	});

	return {
		deleteCategory: mutation.mutateAsync,
	    ...mutation,	
	};
};

export default useDeleteCategory;
