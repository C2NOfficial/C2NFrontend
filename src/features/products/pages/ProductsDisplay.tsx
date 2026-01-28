import { useState, useEffect } from "react";
import useProductFilters from "../hooks/useProductFilters";
import styles from "./ProductsDisplay.module.css";
import type { MediaItem, Product } from "../model";
import { useNavigate } from "react-router-dom";

interface ProductTileProps {
	product: Product;
	onClick: () => void;
}

const ProductTile = ({ product, onClick }: ProductTileProps) => {
	const [hovered, setHovered] = useState(false);
	const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

	const images = product.media.filter((m: MediaItem) => m.type === "image");
	const media = images[currentMediaIndex] || images[0];

	useEffect(() => {
		if (!hovered || images.length <= 1) return;

		//Display the next image immediately after the thumnail one, rest after 1s (initial hover image change)
		const delay = currentMediaIndex === 0 ? 0 : 1000;

		const timer = setTimeout(() => {
			setCurrentMediaIndex((prev) => (prev + 1) % images.length);
		}, delay);

		return () => clearTimeout(timer);
	}, [hovered, currentMediaIndex, images.length]);

	return (
		<div
			onClick={onClick}
			className={styles.productDisplayTile}
			onMouseEnter={() => {
				setHovered(true);
				setCurrentMediaIndex(0);
			}}
			onMouseLeave={() => {
				setHovered(false);
				setCurrentMediaIndex(0);
			}}
		>
			<div className={styles.imageWrapper}>
				<img
					src={media.url}
					alt={product.name}
					className={styles.productMedia}
				/>
			</div>
			<div className={styles.productInfo}>
				<p className={styles.productName}>{product.name}</p>
				<p className={styles.productPrice}>₹{product.mrp}</p>
			</div>
		</div>
	);
};

const ProductsDisplay = () => {
	const { filteredProducts } = useProductFilters();
	const navigate = useNavigate();

	if (!filteredProducts) return <div>Loading...</div>;

	return (
		<section className={styles.productsDisplay}>
			{filteredProducts.map((product) => (
				<ProductTile
					key={product.id}
					product={product}
					onClick={() => navigate(`/products/${product.slug}`)}
				/>
			))}
		</section>
	);
};

export default ProductsDisplay;
