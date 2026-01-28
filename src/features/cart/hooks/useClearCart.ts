import { toast } from "react-toastify";
import { useAuth } from "../../../context/Auth";
import { useLoadingOverlay } from "../../../context/LoadingOverlay";
import { handleFirebaseError } from "../../../firebase/errors";
import { clearCartFromFirestore, clearCartFromLocalStorage } from "../service";

const useClearCart = () => {
	const { showLoading, hideLoading } = useLoadingOverlay();
	const { user } = useAuth();

	const clearCart = async () => {
		showLoading();
		try {
			if (!user) {
				clearCartFromLocalStorage();
				return;
			}
			await clearCartFromFirestore(user.uid);
		} catch (err) {
			toast.error(handleFirebaseError(err));
		} finally {
			hideLoading();
		}
	};
	return { clearCart };
};

export default useClearCart;
