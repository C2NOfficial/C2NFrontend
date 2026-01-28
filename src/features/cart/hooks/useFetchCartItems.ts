import {
	fetchCartItemsFromFirestore,
	fetchCartItemsFromLocalStorage,
	mapEachProductToCartItem,
} from "../service";
import { useAuth } from "../../../context/Auth";
import { toast } from "react-toastify";
import { handleFirebaseError } from "../../../firebase/errors";
import type { CartItem } from "../model";
import { useCallback, useState } from "react";
import type { Product } from "../../products/model";

interface UseFetchCartItemsProps {
	products: Product[] | undefined;
}

const useFetchCartItems = ({products}: UseFetchCartItemsProps) => {
	const { user } = useAuth();
	const [isFetching, setIsFetching] = useState(true);

	const fetchCartItems = useCallback(async (): Promise<CartItem[]> => {
		let cartItems: CartItem[] = [];
		if (!user) {
			cartItems = fetchCartItemsFromLocalStorage();
			setIsFetching(false);
			return mapEachProductToCartItem(products, cartItems);
		}
		try {
			cartItems = await fetchCartItemsFromFirestore(user.uid);
			return mapEachProductToCartItem(products, cartItems);
		} catch (error) {
			toast.error(handleFirebaseError(error));
			return [];
		} finally {
			setIsFetching(false);
		}
	}, [user, products]);

	return {
		fetchCartItems,
		isFetching,
	};
};

export default useFetchCartItems;
