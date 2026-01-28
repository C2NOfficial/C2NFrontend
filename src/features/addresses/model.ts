interface Address {
	id: string;
	address1: string;
	address2: string;
	city: string;
	state: string;
	zip: string;
	country: string;
}

interface AddressErrors {
	address1: string;
	address2: string;
	city: string;
	state: string;
	zip: string;
	country: string;
}

export const defaultAddress = {
	id: "",
	address1: "",
	address2: "",
	city: "",
	state: "",
	zip: "",
	country: "India",
};

export const defaultAddressErrors = {
	address1: "",
	address2: "",
	city: "",
	state: "",
	zip: "",
	country: "",
};
export type { Address, AddressErrors };
