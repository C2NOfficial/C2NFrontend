import styles from "./SkeletonLoaders.module.css";

const SingleProductSkeletonLoader = () => {
	return (
		<section className={styles.page}>
			<div className={styles.productContainer}>
				{/* LEFT */}
				<section className={styles.imageSection}>
					<div className={`${styles.mainImage} ${styles.skeleton}`} />

					<div className={styles.imageList}>
						{Array.from({ length: 4 }).map((_, i) => (
							<div
								key={i}
								className={`${styles.imageListItem} ${styles.skeleton}`}
							/>
						))}
					</div>
				</section>

				{/* RIGHT */}
				<section className={styles.productDetails}>
					<div className={`${styles.skeleton} ${styles.brandSkeleton}`} />
					<div className={`${styles.skeleton} ${styles.titleSkeleton}`} />
					<div className={`${styles.skeleton} ${styles.priceSkeleton}`} />

					{/* Sizes */}
					<div className={styles.sizeSection}>
						<div className={`${styles.skeleton} ${styles.labelSkeleton}`} />
						<div className={styles.sizeChart}>
							{Array.from({ length: 6 }).map((_, i) => (
								<div
									key={i}
									className={`${styles.sizeButton} ${styles.skeleton}`}
								/>
							))}
						</div>
					</div>

					{/* Quantity */}
					<div className={styles.quantitySection}>
						<div className={`${styles.skeleton} ${styles.labelSkeleton}`} />
						<div className={`${styles.qtyControl} ${styles.skeleton}`} />
					</div>

					{/* CTA */}
					<div className={`${styles.addToCart} ${styles.skeleton}`} />

					<div className={styles.secondaryActions}>
						<div className={`${styles.wishlistBtn} ${styles.skeleton}`} />
						<div className={`${styles.buyNowBtn} ${styles.skeleton}`} />
					</div>

					{/* Accordions */}
					{Array.from({ length: 4 }).map((_, i) => (
						<div key={i} className={styles.accordion}>
							<div
								className={`${styles.skeleton} ${styles.accordionSkeleton}`}
							/>
						</div>
					))}
				</section>
			</div>
		</section>
	);
};

export default SingleProductSkeletonLoader;