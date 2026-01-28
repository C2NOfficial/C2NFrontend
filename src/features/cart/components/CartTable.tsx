import type { CartItem } from "../model";
import styles from "./CartTable.module.css";

interface CartTableProps {
	cart: CartItem[];
	isFetching: boolean;
	handleQuantityChange: (id: string, quantity: number) => void;
	handleDelete: (id: string) => void;
}

const CartTable = ({
	cart,
	handleDelete,
	isFetching,
	handleQuantityChange,
}: CartTableProps) => {
	if (isFetching) {
		return <p>Loading...</p>;
	}
	return (
		<table className={styles.cartTable}>
			<thead>
				<tr>
					<th>Product</th>
					<th>Size</th>
					<th>Quantity</th>
					<th>Price</th>
					<th></th>
				</tr>
			</thead>

			<tbody>
				{cart.map((item: CartItem) => (
					<tr key={item.id}>
						<td>
							<div className={styles.productCell}>
								<img
									src={item.product.media[0].url ?? ""}
									alt={item.product.name}
									className={styles.productImage}
								/>
								<div>
									<p className={styles.productName}>
										{item.product.name}
									</p>
								</div>
							</div>
						</td>

						<td>{item.size || "-"}</td>

						<td>
							<div className={styles.quantityControl}>
								<button
									onClick={() =>
										handleQuantityChange(item.id, -1)
									}
								>
									−
								</button>
								<span>{item.quantity}</span>
								<button
									onClick={() =>
										handleQuantityChange(item.id, 1)
									}
								>
									+
								</button>
							</div>
						</td>

						<td>
							₹
							{(
								item.product.mrp * item.quantity
							).toLocaleString()}
						</td>

						<td>
							<button
								className={styles.removeButton}
								onClick={() => handleDelete(item.id)}
							>
								✕
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default CartTable;
