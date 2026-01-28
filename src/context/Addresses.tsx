import React, { useContext, useEffect } from "react";
import { type Address } from "../features/addresses/model";
import useFetchAddresses from "../features/addresses/hooks/useFetchAddresses";

interface AddressesContextType {
	addresses: Address[];
	setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
	isFetchingAddresses: boolean;
}

const AddressesContext = React.createContext<AddressesContextType | null>(null);

export const AddressProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [addresses, setAddresses] = React.useState<Address[]>([]);
	const { fetchAddresses, isFetchingAddresses } = useFetchAddresses();
	useEffect(() => {
		fetchAddresses().then((addresses) => {
			setAddresses(addresses);
		});
	}, [fetchAddresses]);

	return (
		<AddressesContext.Provider
			value={{ addresses, setAddresses, isFetchingAddresses }}
		>
			{children}
		</AddressesContext.Provider>
	);
};

export const useAddressContext = (): AddressesContextType => {
	const ctx = useContext(AddressesContext);
	if (!ctx) {
		throw new Error(
			"useAddressContext must be used within an AddressProvider",
		);
	}
	return ctx;
};
