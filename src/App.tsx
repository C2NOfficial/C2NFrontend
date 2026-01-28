import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import TopBar from "./components/TopBar/TopBar";
import { PATHS } from "./constants/paths";
import Footer from "./components/Footer/Footer";
import LoadingOverlay from "./components/LoadingOverlay/LoadingOverlay";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./features/auth/pages/SignIn";
import SignUp from "./features/auth/pages/SignUp";
import ProductsDisplay from "./features/products/pages/ProductsDisplay";
import SingleProductPage from "./features/products/pages/SingleProduct";
import CartPage from "./features/cart/pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Wishlist from "./features/wishlist/pages/Wishlist";
import Dashboard from "./features/dashboard/pages/Dashboard";
import Checkout from "./features/checkout/pages/Checkout";
import PaymentFailure from "./features/payments/pages/PaymentFailure";
import PaymentSuccess from "./features/payments/pages/PaymentSuccess";

const App = () => {
	const reviews = [
		{
			rating: 5,
			review: "This is a test review",
			name: "John Doe",
			date: "2022-01-01",
		},
		{
			rating: 4,
			review: "This is a test review. This is just another text to check how much space is required for a big review and leaving the details",
			name: "Jane Doe",
			date: "2022-01-01",
		},
	];

	const RegularLayout: React.FC<{ children: React.ReactNode }> = ({
		children,
	}) => (
		<>
			<TopBar
				barText={[
					"Crafted with Premium Fabrics",
					"Secure Checkout via PayU",
					"Support for Returns & Exchanges",
					"Custom order with sleeve lengths, sleeve types and more",
					"Made-to-Order Styles Available",
				]}
			/>
			<Header />
			{children}
			<Footer />
		</>
	);

	const MinimalLayout: React.FC<{ children: React.ReactNode }> = ({
		children,
	}) => <>{children}</>;

	return (
		<Router>
			<Routes>
				<Route
					path={PATHS.HOME}
					element={
						<RegularLayout>
							<Home Reviews={reviews} />
						</RegularLayout>
					}
				/>
				<Route
					path={PATHS.SINGLE_PRODUCT}
					element={
						<RegularLayout>
							<SingleProductPage />
						</RegularLayout>
					}
				/>
				<Route
					path={PATHS.CART}
					element={
						<RegularLayout>
							<CartPage />
						</RegularLayout>
					}
				/>
				<Route
					path={PATHS.CHECKOUT}
					element={
						<RegularLayout>
							<Checkout />
						</RegularLayout>
					}
				/>
				<Route
					path={PATHS.SHOP_ALL}
					element={
						<RegularLayout>
							<ProductsDisplay />
						</RegularLayout>
					}
				/>
				<Route
					path={PATHS.WISHLIST}
					element={
						<ProtectedRoute>
							<RegularLayout>
								<Wishlist />
							</RegularLayout>
						</ProtectedRoute>
					}
				/>
				<Route
					path={PATHS.DASHBOARD}
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path={PATHS.REGISTER}
					element={
						<MinimalLayout>
							<SignUp />
						</MinimalLayout>
					}
				/>
				<Route
					path={PATHS.LOGIN}
					element={
						<MinimalLayout>
							<SignIn />
						</MinimalLayout>
					}
				/>
				<Route
					path={PATHS.TERMS_AND_CONDITIONS}
					element={
						<RegularLayout>
							<TermsAndConditions />
						</RegularLayout>
					}
				/>
				<Route
					path={PATHS.PAYMENT_FAILURE}
					element={
						<RegularLayout>
							<PaymentFailure />
						</RegularLayout>
					}
				/>
				<Route
					path={PATHS.PAYMENT_SUCCESS}
					element={
						<RegularLayout>
							<PaymentSuccess />
						</RegularLayout>
					}
				/>
			</Routes>
			<LoadingOverlay />
			<ScrollToTop />
			<ToastContainer position="top-right" autoClose={3000} />
		</Router>
	);
};

export default App;
