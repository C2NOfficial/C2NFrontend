import { toast } from "react-toastify";
import type { WishlistItem } from "../model";
import { handleFirebaseError } from "../../../firebase/errors";
import { fetchFromWishlistFromFirestore } from "../service";
import { useCallback, useState } from "react";
import type { Product } from "../../products/model";
import { useAuth } from "../../../context/Auth";

interface UseFetchWishlistProps {
	products: Product[] | undefined;
}

const useFetchWishlist = ({ products }: UseFetchWishlistProps) => {
	const [isFetchingWishlist, setIsFetchingWishlist] = useState(true);
	const { user } = useAuth();

	const fetchWishlist = useCallback(async (): Promise<WishlistItem[]> => {
		if (!user) return [];
		const { uid } = user;
		try {
			const items = await fetchFromWishlistFromFirestore(uid);

			for (const item of items) {
				const fetchedProduct = products?.find((p) => p.id === item.id);
				if (fetchedProduct) {
					item.product = fetchedProduct;
					item.inStock = item.product.quantity > 0;
				}
			}

			return items;
		} catch (error) {
			toast.error(handleFirebaseError(error));
			return [];
		} finally {
			setIsFetchingWishlist(false);
		}
	}, [user, products]);

	return {
		fetchWishlist,
		isFetchingWishlist,
	};
};

export default useFetchWishlist;
