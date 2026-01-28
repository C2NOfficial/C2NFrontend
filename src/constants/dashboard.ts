import {
	faBox,
	faShoppingCart,
	faTags,
	faPerson,
	faChartLine,
	faUpload,
	faGear,
} from "@fortawesome/free-solid-svg-icons";

export const DASHBOARD_TABS = {
	ORDERS: "orders",
	PRODUCTS: "products",
	CATEGORIES: "categories",
	CUSTOMERS: "customers",
	ANALYTICS: "analytics",
	MEDIA: "media",
	ADDRESS_BOOK: "address-book",
	SETTINGS: "settings",
} as const;

export const DASHBOARD_TABS_BY_ROLE = {
	admin: [
		{ key: DASHBOARD_TABS.ORDERS, label: "Orders", icon: faShoppingCart },
		{ key: DASHBOARD_TABS.PRODUCTS, label: "Products", icon: faBox },
		{ key: DASHBOARD_TABS.CATEGORIES, label: "Categories", icon: faTags },
		{ key: DASHBOARD_TABS.CUSTOMERS, label: "Customers", icon: faPerson },
		{
			key: DASHBOARD_TABS.ANALYTICS,
			label: "Analytics",
			icon: faChartLine,
		},
		{ key: DASHBOARD_TABS.MEDIA, label: "Media", icon: faUpload },
		{ key: DASHBOARD_TABS.SETTINGS, label: "Settings", icon: faGear },
	],
	user: [
		{
			key: DASHBOARD_TABS.ORDERS,
			label: "My Orders",
			icon: faShoppingCart,
		},
		{ key: DASHBOARD_TABS.SETTINGS, label: "Profile", icon: faGear },
		{
			key: DASHBOARD_TABS.ADDRESS_BOOK,
			label: "Address Book",
			icon: faPerson,
		},
		{ key: DASHBOARD_TABS.SETTINGS, label: "Settings", icon: faGear },
	],
} as const;
