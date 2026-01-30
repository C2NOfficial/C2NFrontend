import { toast } from "react-toastify";
import { useAuth } from "../../../context/Auth";
import { useLoadingOverlay } from "../../../context/LoadingOverlay";
import type { CartItem } from "../model";
import { handleFirebaseError } from "../../../firebase/errors";
import {
	saveCartItemsToFirestore,
	saveCartItemsToLocalStorage,
} from "../service";

const useAddCartItems = () => {
	const { showLoading, hideLoading } = useLoadingOverlay();
	const { user } = useAuth();

	const addCartItems = async (items: CartItem[]) => {
		showLoading();
		try {
			if (items.some((item) => item.size.length === 0)) {
				throw new Error("Please select a size for each item");
			}
			if (!user) {
				saveCartItemsToLocalStorage(items);
			} else {
				await saveCartItemsToFirestore(user.uid, items);
			}
		} catch (err) {
			toast.error(handleFirebaseError(err));
		} finally {
			hideLoading();
		}
	};
	return { addCartItems };
};

export default useAddCartItems;
