import React, { createContext, useContext, useEffect, useState } from "react";
import type { CheckoutData } from "../features/checkout/model";
import { useAuth } from "./Auth";

interface CheckoutContextType {
	checkoutData: Partial<CheckoutData>;
	setCheckoutData: React.Dispatch<React.SetStateAction<Partial<CheckoutData>>>;
}

const CheckoutContext = createContext<CheckoutContextType | null>(null);

export const CheckoutProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { user } = useAuth();
	const [checkoutData, setCheckoutData] = useState<Partial<CheckoutData>>({
		items: [],
		paymentProvider: "PayU",
		orderStatus: "pending",
		checkoutUserData: { email: "", name: "", phone: "" },
	});

	useEffect(() => {
		if (!user) return;

		const email = user.email ?? "";
		const name = user.displayName ?? "";
		const phone = user.phoneNumber ?? "";

		setCheckoutData((prev) => ({
			...prev,
			checkoutUserData: { email, name, phone },
		}));
	}, [user]);

	return (
		<CheckoutContext.Provider value={{ checkoutData, setCheckoutData }}>
			{children}
		</CheckoutContext.Provider>
	);
};

export const useCheckoutContext = (): CheckoutContextType => {
	const ctx = useContext(CheckoutContext);
	if (!ctx) {
		throw new Error("useCartContext must be used inside CartProvider");
	}
	return ctx;
};
