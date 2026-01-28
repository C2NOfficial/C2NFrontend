import { toast } from "react-toastify";
import { SESSION_STORAGE_KEYS } from "../../../constants/browser_storage_keys";
import { useAuth } from "../../../context/Auth";
import { useLoadingOverlay } from "../../../context/LoadingOverlay";
import type { Address } from "../model";
import { addAddressToFirestore } from "../service";
import { handleFirebaseError } from "../../../firebase/errors";

const useAddAddress = () => {
	const { idTokenResult } = useAuth();
	const { showLoading, hideLoading } = useLoadingOverlay();

	const addAddress = async (address: Address): Promise<void> => {
		showLoading();
		try {
			if (!idTokenResult) {
				const raw = localStorage.getItem(
					SESSION_STORAGE_KEYS.SAVED_ADDRESSES,
				);
				if (!raw) {
					//need an address id since saving this in local storage
					address.id = crypto.randomUUID();
					localStorage.setItem(
						SESSION_STORAGE_KEYS.SAVED_ADDRESSES,
						JSON.stringify([address]),
					);
				} else {
					const addresses = JSON.parse(raw) as Address[];
					addresses.push(address);
					localStorage.setItem(
						SESSION_STORAGE_KEYS.SAVED_ADDRESSES,
						JSON.stringify(addresses),
					);
				}
			} else {
				await addAddressToFirestore(idTokenResult.token, address);
			}
		} catch (error) {
			toast.error(handleFirebaseError(error));
		} finally {
			hideLoading();
		}
	};
	return {
		addAddress,
	};
};

export default useAddAddress;
