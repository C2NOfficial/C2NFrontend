import { useRef, useState } from "react";
import styles from "./Products.module.css";
import productDialogViews from "./AddProductDialogViews";

const Products = () => {
	const addProductDialogRef = useRef<HTMLDialogElement>(null);
	return (
		<section className={styles.adminProductSection}>
			<button
				className={styles.addProductButton}
				onClick={() => addProductDialogRef.current?.showModal()}
			>
				UPLOAD
			</button>
			<AddProductDialogWizard
				dialogRef={addProductDialogRef}
				views={productDialogViews}
			/>
		</section>
	);
};

interface AddProductDialogProps {
	dialogRef: React.RefObject<HTMLDialogElement | null>;
	views: Record<string, React.ReactNode>;
}

const AddProductDialogWizard = ({
	dialogRef,
	views,
}: AddProductDialogProps) => {
	const steps = Object.keys(views);
	const [currentStep, setCurrentStep] = useState(0);
	const progress = ((currentStep + 1) / steps.length) * 100;
	return (
		<dialog ref={dialogRef} className={styles.addProductDialog}>
			<button
				onClick={() => dialogRef.current?.close()}
				className={styles.closeDialogButton}
			>
				&times;
			</button>

			<section className={styles.progressBarSection}>
				<div className={styles.steps}>
					{steps.map((step, index) => (
						<button
							key={step}
							className={styles.step}
							style={{
								color: index === currentStep ? "var(--primary-red)" : "grey",
							}}
							onClick={() => setCurrentStep(index)}
						>
							{step}
						</button>
					))}
				</div>
				<div className={styles.progressBackground}>
					<div
						className={styles.progress}
						style={{ width: `${progress}%` }}
					></div>
				</div>
			</section>

			<section className={styles.inputSection}>
				<div className={styles.viewContainer}>
					{views[steps[currentStep]]}
				</div>
			</section>
		</dialog>
	);
};
export default Products;
