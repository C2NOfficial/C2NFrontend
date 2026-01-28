import { toast } from "react-toastify";
import { SESSION_STORAGE_KEYS } from "../../../constants/browser_storage_keys";
import { useAuth } from "../../../context/Auth";
import { useLoadingOverlay } from "../../../context/LoadingOverlay";
import { deleteAddressInFirestore } from "../service";
import { handleFirebaseError } from "../../../firebase/errors";
import type { Address } from "../model";

const useDeleteAddress = () => {
	const { user } = useAuth();
	const { showLoading, hideLoading } = useLoadingOverlay();

	const deleteAddress = async (addressId: string): Promise<void> => {
		showLoading();
		try {
			if (!user) {
				const raw = localStorage.getItem(
					SESSION_STORAGE_KEYS.SAVED_ADDRESSES
				);
				if (!raw) return;

				const addresses = JSON.parse(raw) as Address[];
				const updated = addresses.filter(a => a.id !== addressId);
				localStorage.setItem(
					SESSION_STORAGE_KEYS.SAVED_ADDRESSES,
					JSON.stringify(updated)
				);
			} else {
				await deleteAddressInFirestore(user.uid, addressId);
			}
		} catch (error) {
			toast.error(handleFirebaseError(error));
			console.error(error);
		} finally {
			hideLoading();
		}
	};

	return { deleteAddress };
};

export default useDeleteAddress;