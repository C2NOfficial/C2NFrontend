import type { Address } from "../addresses/model";
import type { CartItem } from "../cart/model";
import type { PaymentProvider } from "../payments/model";

interface CheckoutData {
	items: CartItem[];
	checkoutUserData: Partial<CheckoutUserData>;
	address: Address;
	tax: number;
	subTotal: number;
	total: number;
	orderStatus: string;
	paymentProvider: PaymentProvider;
	createdAt: string;
	updatedAt: string;
}

interface CheckoutUserData{
	name: string;
	email: string;
	phone: string;
}

export type { CheckoutData, CheckoutUserData };
