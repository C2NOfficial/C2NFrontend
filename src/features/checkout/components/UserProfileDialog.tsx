import { useEffect, useState } from "react";
import type { CheckoutUserData } from "../model";
import styles from "./UserProfileDialog.module.css";

interface UserProfileDialogProps {
	isOpen: boolean;
	checkoutUserData: Partial<CheckoutUserData>;
	onClose: () => void;
	onSubmit: (data: Partial<CheckoutUserData>) => void;
}

const UserProfileDialog = ({
	isOpen,
	checkoutUserData,
	onClose,
	onSubmit,
}: UserProfileDialogProps) => {
	const [localData, setLocalData] = useState<Partial<CheckoutUserData>>({});

	// Load parent data once into local state when dialog opens
	useEffect(() => {
		if (isOpen && checkoutUserData) {
			setLocalData(checkoutUserData);
		}
	}, [isOpen, checkoutUserData]);

	if (!isOpen) return null;

	return (
		<div className={styles.backdrop} onClick={onClose}>
			<div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
				<button className={styles.closeBtn} onClick={onClose}>
					×
				</button>

				<h3 className={styles.title}>Complete Your Details</h3>
				<p className={styles.subtitle}>
					We need these details to proceed with payment
				</p>

				<div className={styles.form}>
					<input
						type="email"
						placeholder="Email address"
						className={styles.input}
						value={localData.email ?? ""}
						onChange={(e) =>
							setLocalData({ ...localData, email: e.target.value })
						}
					/>

					<input
						type="text"
						placeholder="Full name"
						className={styles.input}
						value={localData.name ?? ""}
						onChange={(e) =>
							setLocalData({ ...localData, name: e.target.value })
						}
					/>

					<input
						type="tel"
						inputMode="numeric"
						maxLength={10}
						placeholder="10 digit phone number"
						className={styles.input}
						value={localData.phone ?? ""}
						onChange={(e) => {
							const onlyNumbers = e.target.value.replace(/\D/g, "");
							setLocalData({ ...localData, phone: onlyNumbers });
						}}
					/>
				</div>

				<button
					className={styles.submitBtn}
					onClick={() => onSubmit(localData)}
				>
					Save
				</button>
			</div>
		</div>
	);
};

export default UserProfileDialog;