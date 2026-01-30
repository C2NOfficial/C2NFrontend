import styles from "./AddedToWishlistNotification.module.css";
import type { Product } from "../../products/model";
import ItemAddedNotification from "../../../components/ItemAddedNotification/ItemAddedNotification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

interface AddedToWishlistNotificationProps {
	product: Product;
	isOpen: boolean;
	onClose: () => void;
}

const AddedToWishlistNotification = ({
	product,
	isOpen,
	onClose,
}: AddedToWishlistNotificationProps) => {
	return (
		<ItemAddedNotification isOpen={isOpen} onClose={onClose}>
			<img
				src={product.media[0].url}
				alt={product.name}
				className={styles.image}
			/>

			<div className={styles.content}>
				<div className={styles.title}>Added to wishlist</div>
				<div className={styles.name}>{product.name}</div>

				<div className={styles.meta}>
					<FontAwesomeIcon icon={faHeart} className={styles.heart} />
				</div>
			</div>
		</ItemAddedNotification>
	);
};

export default AddedToWishlistNotification;
