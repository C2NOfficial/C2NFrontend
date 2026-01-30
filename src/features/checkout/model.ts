import type { Address } from "../addresses/model";
import type { CartItem } from "../cart/model";
import type { PaymentProvider } from "../payments/model";

interface CheckoutData {
	items: CartItem[];
	checkoutUserData: Partial<CheckoutUserData>;
	address: Address;
	tax: number;
	subTotal: number;
	shippingCharge: number;
	total: number;
	status: string;
	paymentProvider: PaymentProvider;
	createdAt: string;
	updatedAt: string;
}

interface CheckoutUserData{
	name: string;
	email: string;
	phone: string;
	uid?: string; //Firestore uid if user is logged in else undefined
}

export type { CheckoutData, CheckoutUserData };
