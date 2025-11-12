import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../constants/paths";
import { useLoadingOverlay } from "../../../context/LoadingOverlay";
import type { User } from "../../../constants/user";
import { toast } from "react-toastify";

const Dashboard = () => {
	const navigate = useNavigate();
	const { isLoading, showLoading, hideLoading } = useLoadingOverlay();

	useEffect(() => {
		showLoading();
		fetch(import.meta.env.VITE_DASHBOARD_URL, {
			credentials: "include",
			method: "GET",
		})
			.then(async (response) => {
				if (response.status === 401) {
					navigate(PATHS.LOGIN);
				}
				if (response.status === 200) {
					const apiResponse: ApiResponse<User> =
						await response.json();
					const user: User = apiResponse.data;
					if (user.role === "admin") {
						navigate(PATHS.ADMIN_PANEL);
					}
				}
			})
			.catch((error) => {
				toast.error((error as Error).message);
				navigate(PATHS.LOGIN);
			})
			.finally(() => {
				hideLoading();
			});
	}, [navigate]);

	if (!isLoading) {
		return (
			<section>
				<h1>Dashboard</h1>
			</section>
		);
	}
};

export default Dashboard;
