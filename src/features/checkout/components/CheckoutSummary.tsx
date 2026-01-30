import { calculateTax } from "../../../constants/tax";
import styles from "./CheckoutSummary.module.css";
import { DISPLAY_TAX_RATE } from "../../../constants/tax";
import { useCartContext } from "../../../context/Cart";
import { useCheckoutContext } from "../../../context/CheckoutContext";

interface CheckoutSummaryProps {
  activeStepIndex: number;
  isFetchingShipping: boolean;
  primaryButtonFn: () => void;
}

const CheckoutSummary = ({
  activeStepIndex,
  primaryButtonFn,
  isFetchingShipping,
}: CheckoutSummaryProps) => {
  const { cart } = useCartContext();
  const { checkoutData } = useCheckoutContext();

  if (!cart || cart.length === 0) return null;
  
  const shipping = checkoutData?.shippingCharge ? checkoutData.shippingCharge : 0;
  const subtotal = cart.reduce((t, i) => t + i.product.mrp * i.quantity, 0);
  const tax = calculateTax(subtotal);
  const total = subtotal + tax + shipping;

  return (
    <div className={styles.summaryBox}>
      <h3>Order Summary</h3>

      <div className={styles.row}>
        <span>Subtotal</span>
        <span>₹{subtotal.toLocaleString()}</span>
      </div>

      <div className={styles.row}>
        <span>Tax ({DISPLAY_TAX_RATE})</span>
        <span>₹{tax.toLocaleString()}</span>
      </div>

      {activeStepIndex === 1 && <div className={styles.row}>
        <span>Shipping</span>
        {!isFetchingShipping ? <span>
          {shipping != 0 ? `₹${shipping.toLocaleString()}` : "Choose address to calculate"}
        </span> : <span>Calculating...</span>}
      </div>}

      <div className={styles.totalRow}>
        <span>Total</span>
        <span>₹{total.toFixed(2).toLocaleString()}</span>
      </div>

      <button className={styles.primaryBtn} onClick={primaryButtonFn}>
        {activeStepIndex === 1 ? "Place Order" : "Continue"}
      </button>
    </div>
  );
};

export default CheckoutSummary;
