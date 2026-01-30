import { lazy, Suspense, useState } from "react";
import styles from "./Checkout.module.css";
import useUpdateCartQuantity from "../../cart/hooks/useUpdateCartQuantity";
import useRemoveCartItem from "../../cart/hooks/useRemoveCartItems";
import { useCartContext } from "../../../context/Cart";
import EmptyCart from "../../cart/pages/EmptyCart";
import CheckoutSummary from "../components/CheckoutSummary";
import { useCheckoutContext } from "../../../context/CheckoutContext";
import { type PayURequest } from "../../payments/model";
import { toast } from "react-toastify";
import PayUForm from "../../payments/components/PayUForm";
import usePlaceOrder from "../hooks/usePlaceOrder";
import {
	calculateTax,
	calculateTotal,
	calculateTotalWithShipping,
} from "../../../constants/tax";
import { getEstimatedShippingCost } from "../../../utils/delhivery";
import { getCartChargeableWeight } from "../../cart/service";

const CHECKOUT_STEPS = ["CART", "SHIPPING & PAYMENT"];

const CartTable = lazy(() => import("../../cart/components/CartTable"));
const AddressBook = lazy(
	() => import("../../addresses/components/AddressBook"),
);
const UserProfileDialog = lazy(() => import("../components/UserProfileDialog"));

const Checkout = () => {
	const [activeStepIndex, setActiveStepIndex] = useState(0);
	const { cart, isFetching } = useCartContext();
	const { handleQuantityChange } = useUpdateCartQuantity();
	const { handleRemoveCartItem } = useRemoveCartItem();
	const { checkoutData, setCheckoutData } = useCheckoutContext();
	const [openUserDialog, setOpenUserDialog] = useState(false);
	const [payURequest, setPayURequest] = useState<PayURequest | null>(null);
	const { placeOrder } = usePlaceOrder();
	const [isFetchingShippingCost, setIsFetchingShippingCost] = useState(false);

	const renderStepComponent = () => {
		return (
			<Suspense fallback={<div>Loading…</div>}>
				{activeStepIndex === 0 && (
					<CartTable
						isFetching={isFetching}
						cart={cart}
						handleDelete={handleRemoveCartItem}
						handleQuantityChange={handleQuantityChange}
					/>
				)}

				{activeStepIndex === 1 && (
					<AddressBook
						selectedAddressID={checkoutData.address?.id}
						onSelectAddress={(address) => {
							setIsFetchingShippingCost(true);
							const subtotal = cart.reduce((t, i) => t + i.product.mrp * i.quantity, 0);
							getEstimatedShippingCost(
								getCartChargeableWeight(cart),
								address.zip,
							).then((shippingCharge: number) => {
								setCheckoutData((prev) => ({
									...prev,
									address: address,
									shippingCharge: shippingCharge,
									total: calculateTotalWithShipping(
										subtotal,
										shippingCharge,
									),
								}));
								setIsFetchingShippingCost(false);
							})
						}
							
						}
					/>
				)}
			</Suspense>
		);
	};

	if (cart.length === 0) {
		return <EmptyCart />;
	}

	if (payURequest) {
		return <PayUForm payuRequest={payURequest} />;
	}

	return (
		<section className={styles.checkout}>
			<div className={styles.steps}>
				{CHECKOUT_STEPS.map((step, index) => (
					<div
						key={step}
						onClick={() => {
							if (index < activeStepIndex) {
								setCheckoutData(prev => ({
									...prev,
									shippingCharge: 0,
									total: calculateTotal(prev.subTotal ?? 0)
								}));
								setActiveStepIndex(index);
							}
						}}
						className={`${styles.step} ${index === activeStepIndex ? styles.stepActive : ""
							}`}
					>
						{step}
					</div>
				))}
			</div>

			<div className={styles.checkoutBody}>
				<div className={styles.stepContent}>
					{renderStepComponent()}
				</div>

				<div className={styles.summary}>
					<CheckoutSummary
						activeStepIndex={activeStepIndex}
						isFetchingShipping={isFetchingShippingCost}
						primaryButtonFn={() => {
							switch (activeStepIndex) {
								case 0: {
									//Cart step
									const subtotal = cart.reduce(
										(t, i) =>
											t + i.product.mrp * i.quantity,
										0,
									);
									setCheckoutData((prev) => ({
										...prev,
										items: cart,
										subtotal: subtotal,
										tax: calculateTax(subtotal),
										total: calculateTotal(subtotal),
									}));
									setActiveStepIndex(activeStepIndex + 1);
									break;
								}
								case 1: {
									//Address step
									if (!checkoutData.address) {
										toast.error(
											"Address is not selected. Please select an address to proceed",
										);
										return;
									}
									if (
										!checkoutData.checkoutUserData ||
										checkoutData.checkoutUserData.email ==
										"" ||
										checkoutData.checkoutUserData.name ==
										"" ||
										checkoutData.checkoutUserData.phone ==
										""
									) {
										setOpenUserDialog(true);
										return;
									}
									placeOrder().then(
										(req: PayURequest | null) => {
											if (req) setPayURequest(req);
										},
									);
								}
							}
						}}
					/>
				</div>
			</div>
			<Suspense>
				<UserProfileDialog
					onClose={() => setOpenUserDialog(false)}
					onSubmit={(userData) => {
						setCheckoutData((prev) => ({
							...prev,
							checkoutUserData: userData,
						}));
						setOpenUserDialog(false);
					}}
					isOpen={openUserDialog}
					checkoutUserData={checkoutData.checkoutUserData ?? {}}
				/>
			</Suspense>
		</section>
	);
};

export default Checkout;
