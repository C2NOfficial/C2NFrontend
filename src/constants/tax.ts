export const TAX_RATE = Number(import.meta.env.VITE_TAX_RATE);
export const DISPLAY_TAX_RATE = String(TAX_RATE * 100) + '%';

export const calculateTax = (subtotal: number) => subtotal * TAX_RATE;
export const calculateTotalWithShipping = (subtotal: number, shipping: number) =>
	subtotal + calculateTax(subtotal) + shipping;
export const calculateTotal = (subtotal: number) =>
	subtotal + calculateTax(subtotal); 