import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useLoadingOverlay } from "../../../context/LoadingOverlay";
import { deleteProductInFirestore } from "../service";
import { handleFirebaseError } from "../../../firebase/errors";

const useDeleteProduct = () => {
	const { showLoading, hideLoading } = useLoadingOverlay();

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (id: string) => {
			await deleteProductInFirestore(id);
			return null;
		},
		onMutate: () => {
			showLoading();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			toast.success("Product deleted successfully");
		},
		onError: (error: any) => {
			toast.error(handleFirebaseError(error));
		},
		onSettled: () => {
			hideLoading();
		},
	});

	return {
		deleteProduct: mutation.mutateAsync,
	    ...mutation,	
	};
};

export default useDeleteProduct;
