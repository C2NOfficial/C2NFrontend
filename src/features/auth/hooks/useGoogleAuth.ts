import type { CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import useLogin, { type LoginFormData } from "./useLogin";
import useSignUp from "./useSignUp";
import type { SignUpFormData } from "./useSignUp";

interface GoogleUser {
	name: string;
	email: string;
}

interface UseGoogleAuthParams {
	isSignUp: boolean;
}

const useGoogleAuth = ({ isSignUp }: UseGoogleAuthParams) => {
	const { loginUser } = useLogin();
	const { createNewUser } = useSignUp();
	const onSuccess = async (response: CredentialResponse) => {
		const user: GoogleUser = jwtDecode(response.credential!);
		if (isSignUp) {
			const signUpFormData: SignUpFormData = {
				name: user.name,
				email: user.email,
				termsAgreed: true,
				password: "",
				authProvider: "google",
			};
			await createNewUser(signUpFormData);
		} else {
			const loginFormData: LoginFormData = {
				email: user.email,
				password: "",
				authProvider: "google",
			};
			await loginUser(loginFormData);
		}
	};
	const onError = () => {
		toast.error("Something went wrong. Please try again");
	};

	return {
		onSuccess,
		onError,
	};
};

export default useGoogleAuth;
