import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import styles from "./NotFound.module.css";

const NotFound = () => {
	return (
		<div className={styles.notFound}>
			<FontAwesomeIcon
				icon={faTriangleExclamation}
				className={styles.icon}
			/>

			<h1 className={styles.title}>Page Not Found</h1>

			<p className={styles.subtitle}>
				The page you’re looking for doesn’t exist or may have been moved.
			</p>

			<div className={styles.actions}>
				<button
					className={styles.primaryBtn}
					onClick={() => (window.location.href = "/")}
				>
					Go to Homepage
				</button>

				<button
					className={styles.secondaryBtn}
					onClick={() => window.history.back()}
				>
					Go Back
				</button>
			</div>
		</div>
	);
};

export default NotFound;