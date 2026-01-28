import { calculateTax } from "../../../constants/tax";
import { useCartContext } from "../../../context/Cart";
import styles from "./CheckoutSummary.module.css";
import { DISPLAY_TAX_RATE } from "../../../constants/tax";

interface CheckoutSummaryProps {
  activeStepIndex: number;
  primaryButtonFn: () => void;
}

const CheckoutSummary = ({
  activeStepIndex,
  primaryButtonFn,
}: CheckoutSummaryProps) => {
  const { cart } = useCartContext();

  const subtotal = cart.reduce((t, i) => t + i.product.mrp * i.quantity, 0);

  const tax = calculateTax(subtotal);
  const total = subtotal + tax;

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

      <div className={styles.totalRow}>
        <span>Total</span>
        <span>₹{total.toLocaleString()}</span>
      </div>

      <button className={styles.primaryBtn} onClick={primaryButtonFn}>
        {activeStepIndex === 2 ? "Place Order" : "Continue"}
      </button>
    </div>
  );
};

export default CheckoutSummary;
