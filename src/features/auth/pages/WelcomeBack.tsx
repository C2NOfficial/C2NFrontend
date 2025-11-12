import { Link } from "react-router-dom";
import styles from "./Shared.module.css";
import { PATHS } from "../../../constants/paths";
import type { LoginFormData } from "../hooks/useLogin";
import useLogin from "../hooks/useLogin";
import { GoogleLogin } from "@react-oauth/google";
import useGoogleAuth from "../hooks/useGoogleAuth";

const WelcomeBack = () => {
	const { loginUser, formBackendErrors } = useLogin();
	const {onSuccess, onError} = useGoogleAuth({isSignUp: false});
	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const data: LoginFormData = {
			email: formData.get("email") as string,
			password: formData.get("password") as string,
			authProvider: "email",
		};
		await loginUser(data);
	};

	return (
		<section className={styles.loginOrSignUpPage}>
			<section className={styles.formSection}>
				<div>
					<h1>Welcome back!</h1>
					<p>Enter your credentials to access your account</p>
				</div>
				<form onSubmit={handleLogin}>
					<div className={styles.formGroup}>
						<label>Email</label>
						<input
							id="email"
							type="email"
							name="email"
							required
							title="Enter your email address registered with C2N"
							className={`${formBackendErrors.email ? styles.error : ""}`}
						/>
						{formBackendErrors.email && (
							<p className={styles.formErrors}>
								{formBackendErrors.email}
							</p>
						)}
					</div>

					<div className={styles.formGroup}>
						<label>Password</label>
						<input
							id="password"
							type="password"
							name="password"
							required
							title="Enter your current password"
							className={`${formBackendErrors.password ? styles.error : ""}`}
						/>
						{formBackendErrors.password && (
							<p className={styles.formErrors}>
								{formBackendErrors.password}
							</p>
						)}
						<button
							className={styles.forgotPasswordButton}
							style={{
								background: "none",
								color: "var(--primary-red)",
								alignSelf: "flex-end",
								fontWeight: "500",
								fontSize: "13px",
							}}
						>
							Forgot Password
						</button>
					</div>
					<button type="submit">Login</button>
				</form>
				<div className={styles.divider}>Or</div>
				<GoogleLogin
					onSuccess={onSuccess}
					onError={onError}
				></GoogleLogin>
				<p className={styles.loginText}>
					Don't have an account?{" "}
					<Link to={PATHS.REGISTER}>Sign Up</Link>
				</p>
			</section>
			<img
				src="public/WelcomeBack.webp"
				alt="welcome-back"
				className={styles.welcomeBackImg}
			/>
		</section>
	);
};

export default WelcomeBack;
