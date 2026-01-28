import { toast } from "react-toastify";
import { useLoadingOverlay } from "../../../context/LoadingOverlay";
import type { WishlistItem } from "../model";
import { handleFirebaseError } from "../../../firebase/errors";
import { addToWishlistInFirestore } from "../service";
import { useAuth } from "../../../context/Auth";

const useAddToWishlist = () => {
	const { user } = useAuth();
	const { showLoading, hideLoading } = useLoadingOverlay();

	const addToWishlist = async (item: WishlistItem) => {
		if (!user) {
			throw new Error("You need to login to add items to wishlist");
		}
		showLoading();
		try {
			await addToWishlistInFirestore(user.uid, item);
			toast.success("Item added to wishlist");
		} catch (error) {
			toast.error(handleFirebaseError(error));
		} finally {
			hideLoading();
		}
	};

	return {
		addToWishlist,
	};
};

export default useAddToWishlist;
