import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useLoadingOverlay } from "../../../context/LoadingOverlay";
import { updateCategoryInFirestore } from "../service";
import { handleFirebaseError } from "../../../firebase/errors";
import type { CategoryForm } from "../model";

const useUpdateCategory = () => {
	const { showLoading, hideLoading } = useLoadingOverlay();

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (category: CategoryForm) => {
			return await updateCategoryInFirestore(category);
		},
		onMutate: () => {
			showLoading();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			toast.success("Category updated successfully");
		},
		onError: (error: any) => {
			toast.error(handleFirebaseError(error));
		},
		onSettled: () => {
			hideLoading();
		},
	});

	return {
		updateCategory: mutation.mutateAsync,
	    ...mutation,	
	};
};

export default useUpdateCategory;
