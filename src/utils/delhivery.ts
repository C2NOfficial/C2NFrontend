import type {
	FailureApiResponse,
	SuccessApiResponse,
} from "../constants/response";

interface EstimateShippingPayload {
	billingMode: "E" | "S"; // Express (E) or Surface (S)
	chargeableWeight: number; // In grams
	originPincode: string; // Pickup pincode
	destinationPincode: string; // Delivery pincode
	shipmentStatus: "Delivered" | "RTO" | "DTO";
	paymentType: "Pre-paid" | "COD";
	length: number; // Package length
	breadth: number; // Package breadth
	height: number; // Package height
	packageType: "box" | "flyer";
}
export async function getEstimatedShippingCost(
	totalWeight: number,
	pincode: string,
): Promise<number> {
	const payload: EstimateShippingPayload = {
		billingMode: "S",
		chargeableWeight: totalWeight,
		originPincode: import.meta.env.VITE_ORIGIN_PINCODE,
		destinationPincode: pincode,
		shipmentStatus: "Delivered",
		length: 0,
		breadth: 0,
		height: 0,
		paymentType: "Pre-paid",
		packageType: "flyer",
	};

	const response = await fetch(
		import.meta.env.VITE_GET_ESTIMATED_SHIPPING_COST_URL,
		{
			method: "POST",
			headers: {
				Accept: "application/json",
			},
			body: JSON.stringify(payload),
		},
	);

	if (!response.ok) {
		const errorResponse: FailureApiResponse = await response.json();
		throw new Error(errorResponse.message);
	}

	const data: SuccessApiResponse<number> = await response.json();
	return data.data;
}