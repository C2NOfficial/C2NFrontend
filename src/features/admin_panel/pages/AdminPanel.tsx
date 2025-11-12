import { useState } from "react";
import { DASHBOARD_TABS } from "../../../constants/dashboard";
import { SESSION_KEYS } from "../../../constants/session_keys";
import styles from "./AdminPanel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBox,
	faChartLine,
	faGear,
	faHouse,
	faPerson,
	faPlug,
	faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import Orders from "../components/Orders";
import { useNavigate } from "react-router-dom";
import Products from "../components/Products";
const AdminPanel = () => {
	const [currentTab, setCurrentTab] = useState(
		sessionStorage.getItem(SESSION_KEYS.ACTIVE_DASHBOARD_TAB) ||
			DASHBOARD_TABS.ORDERS,
	);
	const navigate = useNavigate();
	return (
		<section className={styles.adminPanel}>
			<menu>
				<ul>
					<li onClick={() => setCurrentTab(DASHBOARD_TABS.ORDERS)}>
						<FontAwesomeIcon icon={faShoppingCart} />
						Orders
					</li>

					<li onClick={() => setCurrentTab(DASHBOARD_TABS.PRODUCTS)}>
						<FontAwesomeIcon icon={faBox} />
						Products
					</li>
					<li onClick={() => setCurrentTab(DASHBOARD_TABS.CUSTOMERS)}>
						<FontAwesomeIcon icon={faPerson} />
						Customers
					</li>
					<li onClick={() => setCurrentTab(DASHBOARD_TABS.ANALYTICS)}>
						<FontAwesomeIcon icon={faChartLine} />
						Analytics
					</li>
					<li onClick={() => setCurrentTab(DASHBOARD_TABS.SETTINGS)}>
						<FontAwesomeIcon icon={faPlug} />
						Integrations
					</li>
					<li
						onClick={() =>
							setCurrentTab(DASHBOARD_TABS.INTEGRATIONS)
						}
					>
						<FontAwesomeIcon icon={faGear} />
						Settings
					</li>
					<li onClick={() => navigate("/")}>
						<FontAwesomeIcon icon={faHouse} />
						Home
					</li>
				</ul>
			</menu>
			<section>
				{currentTab === DASHBOARD_TABS.ORDERS && <Orders />}
				{currentTab === DASHBOARD_TABS.PRODUCTS && <Products />}
				{currentTab === DASHBOARD_TABS.CUSTOMERS && (
					<div>Customers</div>
				)}
				{currentTab === DASHBOARD_TABS.ANALYTICS && (
					<div>Analytics</div>
				)}
				{currentTab === DASHBOARD_TABS.INTEGRATIONS && (
					<div>Integrations</div>
				)}
				{currentTab === DASHBOARD_TABS.SETTINGS && <div>Settings</div>}
			</section>
		</section>
	);
};

export default AdminPanel;
