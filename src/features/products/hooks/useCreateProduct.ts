import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { ProductForm } from "../model";
import { useLoadingOverlay } from "../../../context/LoadingOverlay";
import { handleFirebaseError } from "../../../firebase/errors";
import {
	createProductInFirestore,
} from "../service";

const useCreateProduct = () => {
	const { showLoading, hideLoading } = useLoadingOverlay();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (productForm: ProductForm) => {
			const productID = await createProductInFirestore(productForm);
			return productID;
		},
		onMutate: () => {
			showLoading();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			toast.success("Product created successfully");
		},
		onError: (error: any) => {
			toast.error(handleFirebaseError(error));
		},
		onSettled: () => {
			hideLoading();
		},
	});

	return {
		createProduct: mutation.mutateAsync,
	};
};

export default useCreateProduct;
