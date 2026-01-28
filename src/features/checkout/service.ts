import type {
	FailureApiResponse,
	SuccessApiResponse,
} from "../../constants/response";
import type { PayURequest } from "../payments/model";
import type { CheckoutData } from "./model";

async function submitOrderToCFunc(checkoutData: CheckoutData) {
	try {
		const response = await fetch(import.meta.env.VITE_PLACE_ORDER_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(checkoutData),
		});
		if (!response.ok) {
			const failureJSON: FailureApiResponse = await response.json();
			throw new Error(failureJSON.message);
		}
		const successJSON: SuccessApiResponse<PayURequest> =
			await response.json();
		return successJSON.data;
	} catch (error) {
		throw error;
	}
}
export { submitOrderToCFunc };
