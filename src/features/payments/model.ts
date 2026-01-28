type PaymentProvider = "RazorPay" | "PayU";

interface PayURequest {
	key: string;
	txnid: string;
	amount: string;
	productinfo: string;
	firstname: string;
	email: string;
	phone: string;
	surl: string;
	furl: string;
	hash: string;
}
export type { PaymentProvider, PayURequest };
