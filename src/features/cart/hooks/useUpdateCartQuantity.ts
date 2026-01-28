import { useCartContext } from "../../../context/Cart";

const useUpdateCartQuantity = () => {
	const { cart, setCart } = useCartContext();

	const handleQuantityChange = (id: string, delta: number) => {
		const updatedCart = cart.map((item) =>
			item.id === id
				? {
						...item,
						quantity: Math.max(
							1,
							Math.min(50, item.quantity + delta),
						),
					}
				: item,
		);
		setCart(updatedCart);
	};

	return {
		handleQuantityChange,
	};
};

export default useUpdateCartQuantity;
