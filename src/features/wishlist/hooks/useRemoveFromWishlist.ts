import { toast } from "react-toastify";
import { useLoadingOverlay } from "../../../context/LoadingOverlay";
import type { WishlistItem } from "../model";
import { handleFirebaseError } from "../../../firebase/errors";
import { removeFromWishlistInFirestore } from "../service";
import { useAuth } from "../../../context/Auth";

const useRemoveFromWishlist = () => {
	const { user } = useAuth();
	const { showLoading, hideLoading } = useLoadingOverlay();

	const removeFromWishlist = async (item: WishlistItem) => {
		if (!user) {
			throw new Error("You need to login to remove items to wishlist");
		}
		showLoading();
		try {
			await removeFromWishlistInFirestore(user.uid, item);
		} catch (error) {
			toast.error(handleFirebaseError(error));
		} finally {
			hideLoading();
		}
	};

	return {
		removeFromWishlist,
	};
};

export default useRemoveFromWishlist;
