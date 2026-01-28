import {
	defaultAddressErrors,
	type Address,
	type AddressErrors,
} from "./model";

function validateAddressForm(
	form: Address,
	setFormErrors: React.Dispatch<React.SetStateAction<AddressErrors>>,
): boolean {
	const errors: AddressErrors = { ...defaultAddressErrors };

	if (!form.address1.trim()) {
		errors.address1 = "Address line 1 is required";
	}

	if (!form.city.trim()) {
		errors.city = "City is required";
	}

	if (!form.state.trim()) {
		errors.state = "State is required";
	}

	if (!form.zip.trim()) {
		errors.zip = "ZIP / Postal code is required";
	} else if (!/^[0-9]{6}$/.test(form.zip)) {
		errors.zip = "PIN code must be exactly 6 digits";
	}

	if (!form.country.trim()) {
		errors.country = "Country is required";
	}

	setFormErrors(errors);

	// return true only if no errors
	return Object.values(errors).every((e) => e === "");
}

export { validateAddressForm };
