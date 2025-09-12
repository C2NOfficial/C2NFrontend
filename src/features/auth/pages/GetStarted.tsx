import { PATHS } from "../../../constants/paths";
import { Link } from "react-router-dom";
import SignUpImage from "../../../assets/GetStarted.webp";
import styles from "./Shared.module.css";

const GetStarted = () => {
	return (
		<section className={styles.loginOrSignUpPage}>
			<section className={styles.formSection}>
				<h1>Get Started Now</h1>
				<form>
					<div className={styles.formGroup}>
						<label htmlFor="name">Name</label>
						<input id="name" type="text" />
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="email">Email</label>
						<input id="email" type="email" />
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="password">Password</label>
						<input id="password" type="password" />
					</div>
					<div className={styles.privacyPolicyCheckboxDiv}>
						<input type="checkbox" />
						<label>
							I agree to the{" "}
							<Link to={PATHS.PRIVACY_POLICY}>
								terms & conditions
							</Link>
						</label>
					</div>
					<button type="submit">Sign Up</button>
				</form>

				<div className={styles.divider}>Or</div>
				<div className={styles.thirdPartyLoginDiv}>
					<button>Sign in with google</button>
					<button>Sign in with apple</button>
				</div>
				<p className={styles.loginText}>
					Have an account? <Link to={PATHS.LOGIN}> Sign In</Link>
				</p>
			</section>
			<img src={SignUpImage} alt="get-started" />
		</section>
	);
};

export default GetStarted;
