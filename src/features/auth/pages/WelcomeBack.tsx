import { Link } from "react-router-dom";
import WelcomeBackImg from "../../../assets/WelcomeBack.webp";
import styles from "./Shared.module.css";
import { PATHS } from "../../../constants/paths";

const WelcomeBack = () => {
	return (
		<section className={styles.loginOrSignUpPage}>
			<section className={styles.formSection}>
				<div>
					<h1>Welcome back!</h1>
					<p>Enter your credentials to access your account</p>
				</div>
				<form>
					<div className={styles.formGroup}>
						<label>Email</label>
						<input type="email" />
					</div>

					<div className={styles.formGroup}>
						<label>Password</label>
						<input type="password" />
						<button
							style={{
								background: "none",
								color: "var(--primary-red)",
								alignSelf: "flex-end",
								fontWeight: "500",
							}}
						>
							Forgot Password
						</button>
					</div>
					<button>Login</button>
				</form>
				<div className={styles.divider}>Or</div>
				<div className={styles.thirdPartyLoginDiv}>
					<button>Sign in with Google</button>
					<button>Sign in with Apple</button>
				</div>
				<p className={styles.loginText}>
					Don't have an account?{" "}
					<Link to={PATHS.REGISTER}>Sign Up</Link>
				</p>
			</section>
			<img
				src={WelcomeBackImg}
				alt="welcome-back"
				className={styles.welcomeBackImg}
			/>
		</section>
	);
};

export default WelcomeBack;
