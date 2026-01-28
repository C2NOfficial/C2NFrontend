import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import styles from "./EmptyCart.module.css";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../constants/paths";

const EmptyCart = () => {
	const navigate = useNavigate();
	return (
		<div className={styles.emptyCart}>
			<FontAwesomeIcon
				icon={faCartShopping}
				className={styles.cartIcon}
			/>

			<h2 className={styles.title}>Your cart is empty</h2>

			<p className={styles.subtitle}>
				Looks like you haven’t added anything to your cart yet.
			</p>

			<button className={styles.shopBtn} onClick={()=> navigate(PATHS.SHOP_ALL)}>
				Continue Shopping
			</button>
		</div>
	);
};

export default EmptyCart;