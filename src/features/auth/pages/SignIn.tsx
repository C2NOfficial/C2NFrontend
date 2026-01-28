import { Link, useNavigate } from "react-router-dom";
import styles from "./Shared.module.css";
import { PATHS } from "../../../constants/paths";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/init";
import { useLoadingOverlay } from "../../../context/LoadingOverlay";
import { handleFirebaseError } from "../../../firebase/errors";
import { toast } from "react-toastify";
import { GoogleAuthButton } from "../components/GoogleAuthButtons";
import useThirdPartyAuth from "../hooks/useThirdPartyAuth";

const SignIn = () => {
	const navigate = useNavigate();
	const { showLoading, hideLoading } = useLoadingOverlay();
	const { googleAuth } = useThirdPartyAuth();

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		showLoading();
		try {
			const formData = new FormData(event.currentTarget);
			const email = formData.get("email") as string;
			const password = formData.get("password") as string;
			await signInWithEmailAndPassword(auth, email, password).then(() => {
				navigate(PATHS.DASHBOARD);
			});
		} catch (err) {
			toast.error(handleFirebaseError(err));
		} finally {
			hideLoading();
		}
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
						/>
						<p className={styles.formErrors}></p>
					</div>

					<div className={styles.formGroup}>
						<label>Password</label>
						<input
							id="password"
							type="password"
							name="password"
							required
							title="Enter your current password"
						/>
						<p className={styles.formErrors}></p>
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
				<GoogleAuthButton mode="signin" handleGoogleAuth={googleAuth} />
				<p className={styles.loginText}>
					Don't have an account?{" "}
					<Link to={PATHS.REGISTER}>Sign Up</Link>
				</p>
			</section>
			<img
				src="WelcomeBack.webp"
				alt="welcome-back"
				className={styles.welcomeBackImg}
			/>
		</section>
	);
};

export default SignIn;
