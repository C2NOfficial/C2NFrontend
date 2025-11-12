import { useNavigate } from "react-router-dom";
import { useLoadingOverlay } from "../../../context/LoadingOverlay";
import type {
	SuccessApiResponse,
	FailureApiResponse,
} from "../../../constants/response";
import type { User } from "../../../constants/user";
import { useState } from "react";
import { toast } from "react-toastify";

export interface LoginFormData {
	email: string;
	password: string;
	authProvider: string;
}

const useLogin = () => {
	const navigate = useNavigate();
	const { showLoading, hideLoading } = useLoadingOverlay();
	const [formBackendErrors, setFormBackendErrors] = useState<
		Record<string, string>
	>({});

	const loginUser = async (data: LoginFormData): Promise<void> => {
		try {
			showLoading();
			const response = await fetch(import.meta.env.VITE_LOGIN_URL, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				const apiResponse =
					(await response.json()) as FailureApiResponse;
				//If any errors for the form to display on the frontend. Regular errors are
				//shown by a simple toast.
				if (apiResponse.errors && data.authProvider === "email") {
					setFormBackendErrors(apiResponse.errors);
				} else {
					throw new Error(apiResponse.message);
				}
			} else {
				const successResponse =
					(await response.json()) as SuccessApiResponse<User>;
				const user = successResponse.data;
				if (user.role === "admin") {
					navigate(`/admin-panel`);
				}
				if (user.role === "user") {
					navigate(`/dashboard`);
				}
			}
		} catch (error) {
			toast.error((error as Error).message);
		} finally {
			hideLoading();
		}
	};
	return { loginUser, formBackendErrors };
};

export default useLogin;
