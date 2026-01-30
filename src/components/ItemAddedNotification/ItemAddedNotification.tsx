import { useEffect, useState } from "react";
import styles from "./ItemAddedNotification.module.css";

interface ItemAddedNotificationProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const ItemAddedNotification = ({
	isOpen,
	onClose,
	children,
}: ItemAddedNotificationProps) => {
	const [isClosing, setIsClosing] = useState(false);

	useEffect(() => {
		if (!isOpen) return;
		setIsClosing(false);

		const timer = setTimeout(() => setIsClosing(true), 2000);
		return () => clearTimeout(timer);
	}, [isOpen]);

	useEffect(() => {
		if (!isClosing) return;
		const timer = setTimeout(onClose, 350);
		return () => clearTimeout(timer);
	}, [isClosing, onClose]);

	if (!isOpen) return null;

	return (
		<div
			className={`${styles.notification} ${
				isClosing ? styles.closing : ""
			}`}
		>
			{children}
			<button className={styles.close} onClick={() => setIsClosing(true)}>
				&times;
			</button>
		</div>
	);
};

export default ItemAddedNotification;
