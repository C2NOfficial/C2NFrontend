import type { Address } from "../model";
import { useAuth } from "../../../context/Auth";
import { SESSION_STORAGE_KEYS } from "../../../constants/browser_storage_keys";
import { toast } from "react-toastify";
import { handleFirebaseError } from "../../../firebase/errors";
import { fetchAddressesFromFirestore } from "../service";
import { useCallback, useState } from "react";

const useFetchAddresses = () => {
	const { user } = useAuth();
	const [isFetchingAddresses, setIsFetchingAddresses] = useState(false);

	const fetchAddresses = useCallback(async (): Promise<Address[]> => {
		setIsFetchingAddresses(true);
		try {
			if (!user) {
				const raw = localStorage.getItem(
					SESSION_STORAGE_KEYS.SAVED_ADDRESSES,
				);
				if (!raw) return [];
				return JSON.parse(raw) as Address[];
			} else {
				return fetchAddressesFromFirestore(user.uid);
			}
		} catch (error) {
			toast.error(handleFirebaseError(error));
			return [];
		} finally {
			setIsFetchingAddresses(false);
		}
	}, [user]);

	return { fetchAddresses, isFetchingAddresses };
};

export default useFetchAddresses;
