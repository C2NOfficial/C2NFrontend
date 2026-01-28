import { PATHS } from "../../../constants/paths";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Shared.module.css";
import { useRef, type ReactNode, useState } from "react";
import { TermsAndConditionsDialog } from "../../../pages/TermsAndConditions/TermsAndConditions";
import { useLoadingOverlay } from "../../../context/LoadingOverlay";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase/init";
import { toast } from "react-toastify";
import { GoogleAuthButton } from "../components/GoogleAuthButtons";
import useThirdPartyAuth from "../hooks/useThirdPartyAuth";

const SignUp = (): ReactNode => {
	const navigate = useNavigate();
	const termsAndConditionsRef = useRef(HTMLDialogElement.prototype);
	const [termsAgreed, setTermsAgreed] = useState(false);
	const { showLoading, hideLoading } = useLoadingOverlay();
	const { googleAuth } = useThirdPartyAuth();

	const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		showLoading();
		try {
			const formData = new FormData(event.currentTarget);
			const name = formData.get("name") as string;
			const email = formData.get("email") as string;
			const password = formData.get("password") as string;
			const termsAgreed = formData.get("termsAgreed") as string;
			if (!termsAgreed) {
				toast.error("Please agree to the terms and conditions");
			}
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);
			await updateProfile(userCredential.user, {
				displayName: name,
			});
			navigate(PATHS.DASHBOARD);
		} catch (error) {
		} finally {
			hideLoading();
		}
	};

	return (
		<section className={styles.loginOrSignUpPage}>
			<section className={styles.formSection}>
				<h1>Get Started Now</h1>
				<form onSubmit={handleSignUp}>
					<div className={styles.formGroup}>
						<label htmlFor="name">Name</label>
						<input
							id="name"
							type="text"
							name="name"
							required
							title="Enter a valid name"
						/>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="email">Email</label>
						<input
							id="email"
							type="email"
							name="email"
							required
							title="Enter a valid email address"
						/>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="password">Password</label>
						<input
							id="password"
							type="password"
							name="password"
							required
							title="Enter a valid password"
						/>
					</div>
					<div className={styles.termsAndConditionsCheckboxDiv}>
						<input
							type="checkbox"
							id="termsAgreed"
							name="termsAgreed"
							required
							checked={termsAgreed}
							onChange={() => setTermsAgreed(!termsAgreed)}
						/>
						<label htmlFor="termsAgreed">
							I agree to the{" "}
							<button
								className={
									styles.termsAndConditionsDialogButton
								}
								onClick={() =>
									termsAndConditionsRef.current?.showModal()
								}
							>
								terms & conditions
							</button>
						</label>
					</div>
					<button type="submit">Sign Up</button>
				</form>
				<div className={styles.divider}>Or</div>
				<GoogleAuthButton mode="signup" handleGoogleAuth={googleAuth} />
				<p className={styles.loginText}>
					Have an account? <Link to={PATHS.LOGIN}> Sign In</Link>
				</p>
			</section>
			<img src="GetStarted.webp" alt="get-started" />
			<TermsAndConditionsDialog
				showDialogRef={termsAndConditionsRef}
				setAccepted={setTermsAgreed}
			/>
		</section>
	);
};

export default SignUp;
