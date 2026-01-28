import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Home.module.css";
import { faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/paths";

interface HomeProps {
	Reviews: Array<any>;
}

const Home: React.FC<HomeProps> = ({ Reviews }) => {
	const navigate = useNavigate();
	const [review, setReview] = useState<any>(Reviews?.[0]);

	useEffect(() => {
		const interval = setInterval(() => {
			const index = Math.floor(Math.random() * Reviews.length);
			setReview(Reviews[index]);
		}, 2000);

		return () => clearInterval(interval);
	}, [review]);

	return (
		<section className={styles.homePageSection}>
			<section className={styles.firstSection}>
				<div className={styles.textArea}>
					<div>
						<h1>
							QUALITY YOU TRUST,
							<br />
							PRICES YOU LOVE!
						</h1>
						<p>
							Discover top-quality products at unbeatable prices.
							We <br />
							bring you the best without breaking the bank!
						</p>
					</div>
					<button onClick={() => navigate(PATHS.SHOP_ALL)}>
						SHOP NOW <FontAwesomeIcon icon={faArrowRight} />
					</button>
				</div>
				<img src="HomePageSection1.webp" alt="first-section" />
			</section>
			<section className={styles.secondSection}>
				<div className={styles.latestCollectionTextDiv}>
					<h1>
						LATEST <br />
						COLLECTION
					</h1>
					<p>
						Our tactile products can help you kick off 2024 <br />
						with better routines and less screens.
					</p>
					<button>
						SHOP ALL <FontAwesomeIcon icon={faArrowRight} />
					</button>
				</div>
				<div className={styles.latestCollectionImageTileDiv}></div>
			</section>
			<section className={styles.thirdSection}>
				<h1>
					Premium Product In <br /> Pocket-Friendly Prices
				</h1>
				<p>That's the C2N Promise!</p>
			</section>
			<section className={styles.fourthSection}>
				<img src="HomePageSection4.webp" alt="section-4" />
				<article>
					<h1>ABOUT US - WHY CHOOSE C2N? </h1>
					<p>
						At C2N Shop, we believe that quality should never come
						at the cost of affordability. Our mission is to provide
						premium products at reasonable prices, ensuring that you
						get the best value without compromise. From stylish
						apparel to everyday essentials, every item in our
						collection is crafted with care, keeping comfort,
						durability, and design in mind.
					</p>
					<p>
						What sets us apart is our commitment to excellence and
						customer satisfaction. We carefully curate our selection
						to bring you high-quality materials, thoughtful designs,
						and trend-forward styles. Whether you're looking for
						cozy hoodies, everyday T-shirts, or timeless wardrobe
						staples, our products are made to fit seamlessly into
						your lifestyle.
					</p>
					<p>
						When you shop with C2N, you're choosing more than just a
						product—you’re choosing reliability, affordability, and
						a brand that values your trust. We stand by our promise
						of delivering top-notch products with a seamless
						shopping experience. Join our community and redefine the
						way you shop—where quality meets affordability, only at
						C2N!
					</p>
				</article>
			</section>
			<section className={styles.fifthSection}>
				<img src="HomePageSection5.webp" alt="section-5" />
				<div className={styles.textArea}>
					<h1>CLASSIC HOODIE</h1>
					<p>
						Stay cozy and stylish with premium hoodie. Made <br />
						from ultra-soft cotton fleece, perfect for layering and{" "}
						<br />
						everyday wear.
					</p>
					<button>
						LEARN MORE <FontAwesomeIcon icon={faArrowRight} />
					</button>
				</div>
			</section>
			<section className={styles.sixthSection}>
				<div className={styles.reviewsDiv}>
					<h1>REVIEWS ARE IN</h1>
					<div className={styles.reviewStars}>
						{Array.from({ length: review.rating }, (_, i) => (
							<FontAwesomeIcon icon={faStar} key={i} />
						))}
					</div>
					<div className={`${styles.reviewCard} ${styles.show}`}>
						<p className={styles.reviewText}>"{review.review}"</p>
						<p className={styles.reviewName}>– {review.name}</p>
					</div>
				</div>
				<img src="HomePageSection6.webp" alt="section-6" />
			</section>
		</section>
	);
};
export default Home;
