import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./EmptyWishlist.module.css";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";

const EmptyWishlist = () => {
	return (
		<section className={styles.emptyWrapper}>
			<div className={styles.emptyCard}>
				<div className={styles.iconCircle}>
					<FontAwesomeIcon icon={faHeartBroken} />
				</div>

				<h2 className={styles.emptyTitle}>Your wishlist is empty</h2>

				<p className={styles.emptyText}>
					Save your favorite items here and come back anytime.
				</p>

				<button className={styles.shopBtn}>
					Continue Shopping
				</button>
			</div>
		</section>
	);
};

export default EmptyWishlist;