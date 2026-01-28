import { toast } from "react-toastify";
import { useAuth } from "../../../context/Auth";
import { useLoadingOverlay } from "../../../context/LoadingOverlay";
import { handleFirebaseError } from "../../../firebase/errors";
import {
	removeCartItemFromFirestore,
	removeCartItemFromLocalStorage,
} from "../service";
import { useCartContext } from "../../../context/Cart";

const useRemoveCartItem = () => {
	const { showLoading, hideLoading } = useLoadingOverlay();
	const { user } = useAuth();
	const { refreshCart } = useCartContext();

	const removeCartItem = async (itemID: string) => {
		showLoading();
		try {
			if (!user) {
				removeCartItemFromLocalStorage(itemID);
				return;
			}
			await removeCartItemFromFirestore(user.uid, itemID);
		} catch (err) {
			toast.error(handleFirebaseError(err));
		} finally {
			hideLoading();
		}
	};

	const handleRemoveCartItem = async (itemID: string) => {
		await removeCartItem(itemID);
		refreshCart();
	};

	return { removeCartItem, handleRemoveCartItem };
};

export default useRemoveCartItem;
