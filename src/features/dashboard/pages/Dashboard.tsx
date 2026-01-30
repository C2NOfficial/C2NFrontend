import { useState } from "react";
import {
	DASHBOARD_TABS,
	DASHBOARD_TABS_BY_ROLE,
} from "../../../constants/dashboard";
import { SESSION_STORAGE_KEYS } from "../../../constants/browser_storage_keys";
import styles from "./Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Categories from "../../categories/components/Categories";
import { PATHS } from "../../../constants/paths";
import { useAuth } from "../../../context/Auth";
import Products from "../../products/components/Products";
import Media from "../../media/components/Media";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
	const navigate = useNavigate();
	const { isAdmin } = useAuth();
	const [currentTab, setCurrentTab] = useState(
		sessionStorage.getItem(SESSION_STORAGE_KEYS.ACTIVE_DASHBOARD_TAB) ||
			DASHBOARD_TABS.ORDERS,
	);

	const tabs = isAdmin
		? DASHBOARD_TABS_BY_ROLE.admin
		: DASHBOARD_TABS_BY_ROLE.user;

	return (
		<section className={styles.adminPanel}>
			<menu>
				<ul>
					{tabs.map((tab) => {
						return (
							<li
								key={tab.key}
								onClick={() => setCurrentTab(tab.key)}
							>
								<FontAwesomeIcon icon={tab.icon} />
								{tab.label}
							</li>
						);
					})}
					<li onClick={() => navigate(PATHS.HOME)}>
						<FontAwesomeIcon icon={faHome} />
						Home
					</li>
				</ul>
			</menu>
			<section className={styles.adminPanelComponentSection}>
				{currentTab === DASHBOARD_TABS.ORDERS && <div></div>}
				{currentTab === DASHBOARD_TABS.PRODUCTS && <Products />}
				{currentTab === DASHBOARD_TABS.CATEGORIES && <Categories />}
				{currentTab === DASHBOARD_TABS.ANALYTICS && (
					<div>Analytics</div>
				)}
				{currentTab === DASHBOARD_TABS.MEDIA && <Media />}
				{currentTab === DASHBOARD_TABS.SETTINGS && <div>Settings</div>}
				{currentTab === DASHBOARD_TABS.CUSTOMERS && <></>}
			</section>
		</section>
	);
};

export default Dashboard;
