import type React from "react";
import { useAuth } from "../../context/Auth";
import { Navigate, useLocation } from "react-router-dom";
import { PATHS } from "../../constants/paths";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const location = useLocation();
	const { user, loading } = useAuth();

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		return (
			<Navigate to={PATHS.LOGIN} replace state={{ from: location.pathname }} />
		);
	}

	return children;
};

export default ProtectedRoute;
