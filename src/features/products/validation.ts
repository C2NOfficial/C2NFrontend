import { type ProductErrors, type ProductForm } from "./model";

const validateBasicInfo = (
	product: ProductForm,
	setErrors: React.Dispatch<React.SetStateAction<ProductErrors>>,
): boolean => {
	const basicInfoErrors = {
		productName: "",
		productDescription: "",
		productCategory: "",
		productTags: "",
	};
	if (product.name.length === 0) {
		basicInfoErrors.productName = "Product name is required";
	}
	//React Quill empty string is not truly empty. It contains (<p><br></p>. So we remove all the tags and check for only actual text or any new value)
	const cleaned = product.description.replace(/<[^>]*>/g, "").trim();
	if (cleaned.length === 0) {
		basicInfoErrors.productDescription = "Product description is required";
	}
	if (product.category === undefined) {
		basicInfoErrors.productCategory = "Product category is required";
	}
	if (product.tags.length < 3) {
		basicInfoErrors.productTags = "At least 3 product tags are required";
	}
	setErrors((prev) => ({
		...prev,
		...basicInfoErrors,
	}));
	return Object.values(basicInfoErrors).every((x) => x === "");
};

const validateMedia = (
	product: ProductForm,
	setErrors: React.Dispatch<React.SetStateAction<ProductErrors>>,
): boolean => {
	if (product.media.length < 2) {
		setErrors((prev) => ({
			...prev,
			media: "At least 3 images or videos are required",
		}));
		return false;
	}
	return true;
};

const validatePricing = (
	product: ProductForm,
	setErrors: React.Dispatch<React.SetStateAction<ProductErrors>>,
): boolean => {
	const pricingErrors = {
		mrp: "",
		sellingPrice: "",
		costToMake: "",
	};

	if (product.mrp < 0) {
		pricingErrors.mrp = "MRP cannot be negative";
	}

	if (product.sellingPrice < 0) {
		pricingErrors.sellingPrice = "Selling price cannot be negative";
	}

	if (product.costToMake < 0) {
		pricingErrors.costToMake = "Cost to make cannot be negative";
	}

	setErrors((prev) => ({
		...prev,
		...pricingErrors,
	}));

	return Object.values(pricingErrors).every((x) => x === "");
};

const validateInventory = (
	product: ProductForm,
	setErrors: React.Dispatch<React.SetStateAction<ProductErrors>>,
): boolean => {
	const inventoryErrors = {
		quantity: "",
		sku: "",
	};

	if (product.quantity < 0) {
		inventoryErrors.quantity = "Quantity cannot be negative";
	}

	if (product.sku.length === 0) {
		inventoryErrors.sku = "SKU is required";
	}

	setErrors((prev) => ({
		...prev,
		...inventoryErrors,
	}));

	return Object.values(inventoryErrors).every((x) => x === "");
};

const validateShipping = (
	product: ProductForm,
	setErrors: React.Dispatch<React.SetStateAction<ProductErrors>>,
): boolean => {
	const shippingErrors = {
		weight: "",
		height: "",
		width: "",
		length: "",
	};

	if (product.weight <= 0) {
		shippingErrors.weight = "Weight cannot be zero or negative";
	}

	if (product.height <= 0) {
		shippingErrors.height = "Height cannot be zero or negative";
	}

	if (product.width <= 0) {
		shippingErrors.width = "Width cannot be zero or negative";
	}

	if (product.length <= 0) {
		shippingErrors.length = "Length cannot be zero or negative";
	}

	setErrors((prev) => ({
		...prev,
		...shippingErrors,
	}));

	return Object.values(shippingErrors).every((x) => x === "");
};

const validateAdditionalInfo = (
	product: ProductForm,
	setErrors: React.Dispatch<React.SetStateAction<ProductErrors>>,
): boolean => {
	const additionInfoErrors = {
		materials: "",
		careGuide: "",
		deliveryPaymentReturnInfo: "",
	};
	//React Quill empty string is not truly empty. It contains (<p><br></p>. So we remove all the tags and check for only actual text or any new value)
	const cleanedMaterial = product.materials.replace(/<[^>]*>/g, "").trim();
	if (cleanedMaterial.length === 0) {
		additionInfoErrors.materials =
			"Material info is required for the product";
	}

	const cleanedCareGuide = product.careGuide.replace(/<[^>]*>/g, "").trim();
	if (cleanedCareGuide.length === 0) {
		additionInfoErrors.careGuide =
			"Care guide info is required for the product";
	}

	const cleanedDeliveryPaymentReturn = product.deliveryPaymentReturnInfo
		.replace(/<[^>]*>/g, "")
		.trim();
	if (cleanedDeliveryPaymentReturn.length === 0) {
		additionInfoErrors.deliveryPaymentReturnInfo =
			"Delivery payment return info is required for the product";
	}

	setErrors((prev) => ({
		...prev,
		...additionInfoErrors,
	}));

	return Object.values(additionInfoErrors).every((x) => x === "");
};
export {
	validateBasicInfo,
	validateMedia,
	validatePricing,
	validateShipping,
	validateInventory,
	validateAdditionalInfo,
};
