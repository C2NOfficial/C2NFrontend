import { useCartContext } from "../../../context/Cart";

const useUpdateCartQuantity = () => {
	const { setCart } = useCartContext();
	
	const handleQuantityChange = (id: string, delta: number) => {
		setCart(prev =>
			prev.map(item =>
				item.id === id
					? {
						...item,
						quantity: Math.max(1, Math.min(50, item.quantity + delta)),
					}
					: item
			)
		);
	};
	
	return {
		handleQuantityChange,
	};
};

export default useUpdateCartQuantity;
