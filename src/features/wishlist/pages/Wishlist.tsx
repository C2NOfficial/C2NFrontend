import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useWishlistContext } from "../../../context/Wishlist";
import styles from "./Wishlist.module.css";
import useRemoveFromWishlist from "../hooks/useRemoveFromWishlist";
import EmptyWishlist from "./EmptyWishlist";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
	const { wishlist, isFetchingWishlist, refreshWishlist } =
		useWishlistContext();
	const { removeFromWishlist } = useRemoveFromWishlist();
	const navigate = useNavigate();

	if (isFetchingWishlist) {
		return <div className={styles.loading}>Loading...</div>;
	}

	if (wishlist.length === 0) {
		return <EmptyWishlist />;
	}

	return (
		<section className={styles.wrapper}>
			<table className={styles.table}>
				<thead>
					<tr>
						<th />
						<th>Product</th>
						<th>Unit Price</th>
						<th>Stock Status</th>
						<th />
					</tr>
				</thead>

				<tbody>
					{wishlist.map((item) => (
						<tr key={item.id}>
							{/* Remove */}
							<td>
								<button
									className={styles.removeBtn}
									onClick={() => {
										removeFromWishlist(item);
										refreshWishlist();
									}}
								>
									<FontAwesomeIcon icon={faXmark} />
								</button>
							</td>

							{/* Product */}
							<td className={styles.product}>
								<img
									src={
										item.product.media[0].type === "image"
											? item.product.media[0].url
											: item.product.media[1].url
									}
									alt={item.product.name}
								/>
								<span>{item.product.name}</span>
							</td>

							{/* Price */}
							<td className={styles.price}>
								₹{item.product.mrp}
							</td>

							{/* Stock */}
							<td>
								<span
									className={
										item.inStock
											? styles.inStock
											: styles.outOfStock
									}
								>
									{item.inStock ? "In Stock" : "Out of Stock"}
								</span>
							</td>

							{/* View Item */}
							<td>
								<button
									className={styles.cartBtn}
									onClick={() =>
										navigate(
											`/products/${item.product.slug}`,
										)
									}
									disabled={!item.inStock}
								>
									<FontAwesomeIcon icon={faCartShopping} />
									View Product
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
};

export default Wishlist;
