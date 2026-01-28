import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { CategoryForm } from "../model";
import { useLoadingOverlay } from "../../../context/LoadingOverlay";
import { createCategoryInFirestore } from "../service";
import { handleFirebaseError } from "../../../firebase/errors";

const useCreateCategory = () => {
	const { showLoading, hideLoading } = useLoadingOverlay();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (newCategory: CategoryForm) => {
			return createCategoryInFirestore(newCategory);
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
		createCategory: mutation.mutateAsync,
	};
};

export default useCreateCategory;
