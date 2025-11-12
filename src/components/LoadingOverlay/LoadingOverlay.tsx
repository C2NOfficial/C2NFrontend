import styles from "./LoadingOverlay.module.css";
import { useLoadingOverlay } from "../../context/LoadingOverlay";
import type { ReactNode } from "react";

const LoadingOverlay = (): ReactNode => {
	const { isLoading } = useLoadingOverlay();

	return (
		isLoading && (
			<div className={styles.loadingOverlay}>
				<div className={styles.loadingOverlaySpinner}></div>
			</div>
		)
	);
};

export default LoadingOverlay;
