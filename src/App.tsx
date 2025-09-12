import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import TopBar from "./components/TopBar/TopBar";
import { PATHS } from "./constants/paths";
import Footer from "./components/Footer/Footer";
import GetStarted from "./features/auth/pages/GetStarted";
import WelcomeBack from "./features/auth/pages/WelcomeBack";

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
			review: "This is a test review",
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
					"PRE-ORDER ARC ALARM CLOCK",
					"30% DISCOUNT GOING ON RIGHT NOW",
					"FREE SHIPPING ON ORDERS OVER $100",
					"ACCEPTS ALL CREDIT CARDS",
					"PREMIUM QUALITY",
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
					path={PATHS.REGISTER}
					element={
						<MinimalLayout>
							<GetStarted />
						</MinimalLayout>
					}
				/>
				<Route
					path={PATHS.LOGIN}
					element={
						<MinimalLayout>
							<WelcomeBack />
						</MinimalLayout>
					}
				/>
			</Routes>
		</Router>
	);
};

export default App;
