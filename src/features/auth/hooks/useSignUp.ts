import { useNavigate } from "react-router-dom";
import { useLoadingOverlay } from "../../../context/LoadingOverlay";
import { PATHS } from "../../../constants/paths";
import type { FailureApiResponse } from "../../../constants/response";
import { useState } from "react";
import { toast } from "react-toastify";

export interface SignUpFormData {
	name: string;
	email: string;
	password: string;
	termsAgreed: boolean;
	authProvider: string;
}

const useSignUp = () => {
	const navigate = useNavigate();
	const { showLoading, hideLoading } = useLoadingOverlay();
	const [formBackendErrors, setFormBackendErrors] = useState<
		Record<string, string>
	>({});
	const createNewUser = async (data: SignUpFormData): Promise<void> => {
		try {
			showLoading();
			const response = await fetch(import.meta.env.VITE_SIGN_UP_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				const apiResponse =
					(await response.json()) as FailureApiResponse;
				if (apiResponse.errors && data.authProvider === "email") {
					setFormBackendErrors(apiResponse.errors);
				} else {
					throw new Error(apiResponse.message);
				}
			} else {
				navigate(PATHS.DASHBOARD);
			}
		} catch (error) {
			toast.error((error as Error).message);
		} finally {
			hideLoading();
		}
	};
	return { createNewUser, formBackendErrors };
};

export default useSignUp;
