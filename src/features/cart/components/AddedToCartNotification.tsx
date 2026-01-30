import styles from "./AddedToCartNotification.module.css";
import type { Product } from "../../products/model";
import ItemAddedNotification from "../../../components/ItemAddedNotification/ItemAddedNotification";

interface AddedToCartNotificationProps {
	product: Product;
	quantity: number;
	size: string;
	isOpen: boolean;
	onClose: () => void;
}

const AddedToCartNotification = ({
	product,
	quantity,
	size,
	onClose,
	isOpen,
}: AddedToCartNotificationProps) => {
	return (
		<ItemAddedNotification isOpen={isOpen} onClose={onClose}>
			<img
				src={product.media[0].url}
				alt={product.name}
				className={styles.image}
			/>
			<div className={styles.content}>
				<div className={styles.title}>Added to cart</div>
				<div className={styles.name}>{product.name}</div>

				<div className={styles.meta}>
					<span className={styles.sizeBadge}>Size {size}</span>
					<span className={styles.price}>
						₹{product.mrp} × {quantity}
					</span>
				</div>
			</div>
		</ItemAddedNotification>
	);
};

export default AddedToCartNotification;
