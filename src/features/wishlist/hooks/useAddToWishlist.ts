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
		showLoading();
		if (!user) {
			throw new Error("You need to login to add items to wishlist");
		}
		try {
			await addToWishlistInFirestore(user.uid, item);
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
