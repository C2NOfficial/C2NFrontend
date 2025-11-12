import { PATHS } from "../../../constants/paths";
import { Link } from "react-router-dom";
import styles from "./Shared.module.css";
import useSignUp, { type SignUpFormData } from "../hooks/useSignUp";
import { useRef, type ReactNode, useState } from "react";
import { TermsAndConditionsDialog } from "../../../pages/TermsAndConditions/TermsAndConditions";
import { GoogleLogin } from "@react-oauth/google";
import useGoogleAuth from "../hooks/useGoogleAuth";

const GetStarted = (): ReactNode => {
	const { createNewUser, formBackendErrors } = useSignUp();
	const { onSuccess, onError } = useGoogleAuth({isSignUp: true});
	const termsAndConditionsRef = useRef(HTMLDialogElement.prototype);
	const [termsAgreed, setTermsAgreed] = useState(false);

	const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const data: SignUpFormData = {
			name: formData.get("name") as string,
			email: formData.get("email") as string,
			password: formData.get("password") as string,
			termsAgreed: termsAgreed,
			authProvider: "email",
		};
		await createNewUser(data);
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
							className={`${formBackendErrors.name ? styles.error : ""}`}
						/>
						{formBackendErrors.name && (
							<p className={styles.formErrors}>
								{formBackendErrors.name}
							</p>
						)}
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="email">Email</label>
						<input
							id="email"
							type="email"
							name="email"
							required
							title="Enter a valid email address"
							className={`${formBackendErrors.email ? styles.error : ""}`}
						/>
						{formBackendErrors.email && (
							<p className={styles.formErrors}>
								{formBackendErrors.email}
							</p>
						)}
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="password">Password</label>
						<input
							id="password"
							type="password"
							name="password"
							required
							title="Enter a valid password"
							className={`${formBackendErrors.password ? styles.error : ""}`}
						/>
						{formBackendErrors.password && (
							<p className={styles.formErrors}>
								{formBackendErrors.password}
							</p>
						)}
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
				<GoogleLogin
					onSuccess={onSuccess}
					onError={onError}
				></GoogleLogin>
				<p className={styles.loginText}>
					Have an account? <Link to={PATHS.LOGIN}> Sign In</Link>
				</p>
			</section>
			<img src="public/GetStarted.webp" alt="get-started" />
			<TermsAndConditionsDialog
				showDialogRef={termsAndConditionsRef}
				setAccepted={setTermsAgreed}
			/>
		</section>
	);
};

export default GetStarted;
