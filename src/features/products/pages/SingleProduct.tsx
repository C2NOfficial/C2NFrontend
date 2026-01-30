import { useEffect, useState } from "react";
import { fetchProductFromSlug } from "../service";
import type { Product } from "../model";
import { toast } from "react-toastify";
import { handleFirebaseError } from "../../../firebase/errors";
import { useParams } from "react-router-dom";
import styles from "./SingleProduct.module.css";
import useAddCartItems from "../../cart/hooks/useAddCartItems";
import { useCartContext } from "../../../context/Cart";
import type { CartItem } from "../../cart/model";
import useAddToWishlist from "../../wishlist/hooks/useAddToWishlist";
import type { WishlistItem } from "../../wishlist/model";
import { useWishlistContext } from "../../../context/Wishlist";
import NotFound from "../../../components/NotFound/NotFound";
import SingleProductSkeletonLoader from "./SkeletonLoaders";
import AddedToCartNotification from "../../cart/components/AddedToCartNotification";
import AddedToWishlistNotification from "../../wishlist/pages/AddedToWishllistNotification";

const SingleProductPage = () => {
	const { slug } = useParams();
	const [product, setProduct] = useState<Product | null>(null);
	const [activeMediaIndex, setActiveMediaIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [quantity, setQuantity] = useState<number>(1);
	const [size, setSize] = useState<string>("");

	const { addCartItems } = useAddCartItems();
	const { cart, refreshCart } = useCartContext();
	const [showAddedToCartNotification, setShowAddedToCartNotification] =
		useState(false);

	const { wishlist, refreshWishlist } = useWishlistContext();
	const { addToWishlist } = useAddToWishlist();
	const [
		showAddedToWishlistNotification,
		setShowAddedToWishlistNotification,
	] = useState(false);

	useEffect(() => {
		if (!slug) return;
		fetchProductFromSlug(slug)
			.then((product) => {
				setProduct(product);
			})
			.catch((err) => toast.error(handleFirebaseError(err)))
			.finally(() => setIsLoading(false));
	}, [slug]);

	if (isLoading) {
		return <SingleProductSkeletonLoader />;
	}

	if (!product) {
		return <NotFound />;
	}

	const activeMedia = product.media[activeMediaIndex];
	const sizes = product.category.sizeChart[0].slice(1);

	return (
		<section className={styles.page}>
			<div className={styles.productContainer}>
				{/* LEFT */}
				<section className={styles.imageSection}>
					{activeMedia.type === "image" ? (
						<img
							className={styles.mainImage}
							src={activeMedia.url}
							alt={product.name}
						/>
					) : (
						<video
							key={activeMedia.url}
							className={styles.mainImage}
							src={activeMedia.url}
							controls
						/>
					)}

					<div className={styles.imageList}>
						{product.media.map((media, index) =>
							media.type === "image" ? (
								<img
									key={media.url}
									className={styles.imageListItem}
									src={media.url}
									alt={`${product.name} image ${index + 1}`}
									onClick={() => setActiveMediaIndex(index)}
								/>
							) : (
								<div
									key={media.url}
									className={styles.thumbnailWrapper}
									onClick={() => setActiveMediaIndex(index)}
								>
									<video
										className={styles.imageListItem}
										src={media.url}
										muted
										playsInline
									/>
								</div>
							),
						)}
					</div>
				</section>

				{/* RIGHT */}
				<section className={styles.productDetails}>
					<h3 className={styles.brand}>C2N ESSENTIALS</h3>
					<h1 className={styles.productName}>{product.name}</h1>
					<h2 className={styles.price}>₹{product.mrp}</h2>

					{/* Sizes */}
					<div className={styles.sizeSection}>
						<label>SIZE</label>
						<div className={styles.sizeChart}>
							{sizes.map((s, index) => {
								const isSelected = size === s.toUpperCase();

								return (
									<button
										key={index}
										className={`${styles.sizeButton} ${
											isSelected
												? styles.sizeSelected
												: ""
										}`}
										onClick={() => setSize(s.toUpperCase())}
									>
										{s}
									</button>
								);
							})}
						</div>
					</div>

					{/* Quantity */}
					<div className={styles.quantitySection}>
						<label>QUANTITY</label>

						<div className={styles.qtyControl}>
							<button
								className={styles.qtyBtn}
								onClick={() =>
									setQuantity((prev: number) =>
										Math.max(1, prev - 1),
									)
								}
							>
								−
							</button>
							<span className={styles.qtyValue}>{quantity}</span>
							<button
								className={styles.qtyBtn}
								onClick={() =>
									setQuantity((prev: number) =>
										Math.min(50, prev + 1),
									)
								}
							>
								+
							</button>
						</div>
					</div>

					{/* CTA */}
					<button
						className={styles.addToCart}
						onClick={() => {
							addCartItems([
								...cart,
								{
									id: `${product.id}_${size}`,
									productId: product.id,
									quantity: quantity,
									size: size,
									price: product.mrp,
									categoryId: product.category.id,
								} as CartItem,
							]).then(() => {
								setShowAddedToCartNotification(true);
								refreshCart();
							});
						}}
					>
						ADD TO CART
					</button>

					<div className={styles.secondaryActions}>
						<button
							className={styles.wishlistBtn}
							onClick={() => {
								if (
									!wishlist.find((w) => w.id === product.id)
								) {
									addToWishlist({
										id: product.id,
									} as WishlistItem).then(() => {
										setShowAddedToWishlistNotification(
											true,
										);
										refreshWishlist();
									});
								}
							}}
						>
							ADD TO WISHLIST
						</button>
						<button className={styles.buyNowBtn}>BUY IT NOW</button>
					</div>
					<details className={styles.accordion}>
						<summary className={styles.accordionTitle}>
							Description
						</summary>
						<div
							className={styles.accordionContent}
							dangerouslySetInnerHTML={{
								__html: product.description,
							}}
						/>
					</details>
					<details className={styles.accordion}>
						<summary className={styles.accordionTitle}>
							Size Guide
						</summary>

						<div className={styles.accordionContent}>
							<table className={styles.sizeTable}>
								<thead>
									<tr>
										{product.category.sizeChart[0].map(
											(col) => (
												<th key={col}>{col}</th>
											),
										)}
									</tr>
								</thead>
								<tbody>
									{product.category.sizeChart
										.slice(1)
										.map((row, i) => (
											<tr key={i}>
												{row.map((cell, j) => (
													<td key={j}>{cell}</td>
												))}
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</details>
					<details className={styles.accordion}>
						<summary className={styles.accordionTitle}>
							Materials
						</summary>
						<div
							className={styles.accordionContent}
							dangerouslySetInnerHTML={{
								__html: product.materials,
							}}
						/>
					</details>
					<details className={styles.accordion}>
						<summary className={styles.accordionTitle}>
							Care Guide
						</summary>
						<div
							className={styles.accordionContent}
							dangerouslySetInnerHTML={{
								__html: product.careGuide,
							}}
						/>
					</details>
					<details className={styles.accordion}>
						<summary className={styles.accordionTitle}>
							Delivery, Payment & Returns
						</summary>
						<div
							className={styles.accordionContent}
							dangerouslySetInnerHTML={{
								__html: product.deliveryPaymentReturnInfo,
							}}
						/>
					</details>
				</section>
			</div>
			<AddedToCartNotification
				product={product}
				quantity={quantity}
				size={size}
				isOpen={showAddedToCartNotification}
				onClose={() => setShowAddedToCartNotification(false)}
			/>
			<AddedToWishlistNotification
				product={product}
				isOpen={showAddedToWishlistNotification}
				onClose={() => setShowAddedToWishlistNotification(false)}
			/>
		</section>
	);
};

export default SingleProductPage;
