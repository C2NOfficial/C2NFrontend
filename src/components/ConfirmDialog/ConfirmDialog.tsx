import styles from "./ConfirmDialog.module.css"

interface ConfirmDialogProps {
	dialogRef: React.RefObject<HTMLDialogElement | null>;
	title: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
	onConfirm: () => void;
}

const ConfirmDialog = ({
	dialogRef,
	title,
	message,
	confirmText = "Confirm",
	cancelText = "Cancel",
	onConfirm,
}: ConfirmDialogProps) => {
	return (
		<dialog ref={dialogRef} className={styles.dialog}>
			<div className={styles.wrapper}>
				<h3 className={styles.title}>{title}</h3>
				<p className={styles.message}>{message}</p>

				<div className={styles.actions}>
					<button
						className={styles.cancelBtn}
						onClick={() => dialogRef.current?.close()}
					>
						{cancelText}
					</button>

					<button
						className={styles.confirmBtn}
						onClick={onConfirm}
					>
						{confirmText}
					</button>
				</div>
			</div>
		</dialog>
	);
};

export default ConfirmDialog
