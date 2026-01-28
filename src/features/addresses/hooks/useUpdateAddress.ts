import { toast } from "react-toastify";
import { SESSION_STORAGE_KEYS } from "../../../constants/browser_storage_keys";
import { useAuth } from "../../../context/Auth";
import { useLoadingOverlay } from "../../../context/LoadingOverlay";
import type { Address } from "../model";
import { updateAddressInFirestore } from "../service";
import { handleFirebaseError } from "../../../firebase/errors";

const useUpdateAddress = () => {
	const { idTokenResult } = useAuth();
	const { showLoading, hideLoading } = useLoadingOverlay();

	const updateAddress = async (updatedAddress: Address): Promise<void> => {
		showLoading();
		try {
			if (!idTokenResult) {
				const raw = localStorage.getItem(
					SESSION_STORAGE_KEYS.SAVED_ADDRESSES
				);
				if (!raw) return;

				const addresses = JSON.parse(raw) as Address[];
				const updated = addresses.map(addr =>
					addr.id === updatedAddress.id ? updatedAddress : addr
				);
				localStorage.setItem(
					SESSION_STORAGE_KEYS.SAVED_ADDRESSES,
					JSON.stringify(updated)
				);
			} else {
				await updateAddressInFirestore(idTokenResult.token, updatedAddress);
			}
		} catch (error) {
			toast.error(handleFirebaseError(error));
		} finally {
			hideLoading();
		}
	};

	return { updateAddress };
};

export default useUpdateAddress;