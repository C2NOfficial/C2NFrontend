import type { Address } from "../model";
import styles from "./AddressTile.module.css";

interface AddressTileProps {
	address: Address;
	isSelected?: boolean;
	onEdit: () => void;
	select?: () => void;
	onDelete: () => void;
}

const AddressTile = ({
	address,
	isSelected,
	select,
	onEdit,
	onDelete,
}: AddressTileProps) => {
	const { address1, address2, city, state, zip, country } = address;

	return (
		<div
			className={`${styles.addressTile} ${
				isSelected ? styles.selected : ""
			}`}
			onClick={select}
		>
			<div className={styles.tileHeader}>
				<h3 className={styles.addressLabel}>Delivery Address</h3>
				<div className={styles.tileActionButtons}>
					<button
						className={styles.editBtn}
						onClick={(e) => {
							e.stopPropagation();
							onEdit();
						}}
					>
						Edit
					</button>
					<button
						className={styles.editBtn}
						onClick={(e) => {
							e.stopPropagation();
							onDelete();
						}}
					>
						Delete
					</button>
				</div>
			</div>

			<div className={styles.addressBody}>
				<p>{address1}</p>
				{address2 && <p>{address2}</p>}
				<p>
					{city}, {state} {zip}
				</p>
				<p>{country}</p>
			</div>
		</div>
	);
};

export default AddressTile;
