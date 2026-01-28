import { toast } from "react-toastify";
import { useCheckoutContext } from "../../../context/CheckoutContext";
import { useLoadingOverlay } from "../../../context/LoadingOverlay";
import { handleFirebaseError } from "../../../firebase/errors";
import { submitOrderToCFunc } from "../service";
import type { CheckoutData } from "../model";
import type { PayURequest } from "../../payments/model";

const usePlaceOrder = () => {
	const { checkoutData } = useCheckoutContext();
	const { showLoading, hideLoading } = useLoadingOverlay();
	const placeOrder = async (): Promise<PayURequest | null> => {
		showLoading();
		try {
			return await submitOrderToCFunc(checkoutData as CheckoutData);
		} catch (error) {
			toast.error(handleFirebaseError(error));
			return null;
		} finally {
			hideLoading();
		}
	};
	return { placeOrder };
};
export default usePlaceOrder;
