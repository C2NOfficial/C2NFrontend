import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useLoadingOverlay } from "../../../context/LoadingOverlay";
import { handleFirebaseError } from "../../../firebase/errors";
import type { ProductForm } from "../model";
import { updateProductInFirestore } from "../service";

const useUpdateProduct = () => {
	const { showLoading, hideLoading } = useLoadingOverlay();

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (productForm: ProductForm) => {
			await updateProductInFirestore(productForm);
		},
		onMutate: () => {
			showLoading();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			toast.success("Product updated successfully");
		},
		onError: (error: any) => {
			toast.error(handleFirebaseError(error));
		},
		onSettled: () => {
			hideLoading();
		},
	});

	return {
		updateProduct: mutation.mutateAsync,
	    ...mutation,	
	};
};

export default useUpdateProduct;
