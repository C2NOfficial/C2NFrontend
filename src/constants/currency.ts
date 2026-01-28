/**
 * Currency Config 
 * In future we can add more currency support by just getting the country from the user ip
 * and then mapping it with the currency config
 * Not using this for now
 */
export const currencyConfig = {
  IN: { code: "INR", symbol: "₹", locale: "en-IN" },
  US: { code: "USD", symbol: "$", locale: "en-US" },
  EU: { code: "EUR", symbol: "€", locale: "de-DE" },
} as const;