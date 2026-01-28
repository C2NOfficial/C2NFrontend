import { useCartContext } from "../../../context/Cart";
import useRemoveCartItem from "../hooks/useRemoveCartItems";
import EmptyCart from "./EmptyCart";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../constants/paths";
import CartTable from "../components/CartTable";
import useUpdateCartQuantity from "../hooks/useUpdateCartQuantity";
import { calculateTax } from "../../../constants/tax";
import { DISPLAY_TAX_RATE } from "../../../constants/tax";

const CartPage = () => {
	const navigate = useNavigate();
	const { cart, isFetching } = useCartContext();
	const { handleRemoveCartItem } = useRemoveCartItem();
	const { handleQuantityChange } = useUpdateCartQuantity();

	const subtotal = cart.reduce(
		(total, item) => total + item.product.mrp * item.quantity,
		0,
	);

	const tax = calculateTax(subtotal);
	const total = subtotal + tax;

	if (cart.length === 0) return <EmptyCart />;
	
	return (
		<div className={styles.cartPage}>
			<h1 className={styles.heading}>My Shopping Cart</h1>

			<CartTable
				cart={cart}
				isFetching={isFetching}
				handleDelete={handleRemoveCartItem}
				handleQuantityChange={handleQuantityChange}
			/>
			{/* Summary */}
			<div className={styles.summaryBox}>
				<div>
					<span>Subtotal</span>
					<span>₹{subtotal.toLocaleString()}</span>
				</div>
				<div>
					<span>Tax ({DISPLAY_TAX_RATE})</span>
					<span>₹{tax.toLocaleString()}</span>
				</div>
				<div className={styles.total}>
					<span>Total</span>
					<span>₹{total.toLocaleString()}</span>
				</div>
			</div>

			{/* Actions */}
			<div className={styles.actions}>
				<button className={styles.backBtn}>Back to Shop</button>
				<button
					className={styles.checkoutBtn}
					onClick={() => navigate(PATHS.CHECKOUT)}
				>
					Checkout
				</button>
			</div>
		</div>
	);
};

export default CartPage;
