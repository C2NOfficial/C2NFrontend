import { PATHS } from "../../constants/paths";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTiktok,
	faInstagram,
	faSnapchat,
	faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<section className={styles.companyName}>
				<h1>C2N</h1>
			</section>
			<section className={styles.footerNav}>
				<nav>
					<Link to={PATHS.FAQ}>FAQ</Link>
					<Link to={PATHS.RETURN_POLICY}>Return Policy</Link>
					<Link to={PATHS.REFUND_POLICY}>Refund Policy</Link>
					<Link to={PATHS.PRIVACY_POLICY}>Privacy Policy</Link>
					<Link to={PATHS.TERMS_AND_CONDITIONS}>
						Terms & Conditions
					</Link>
					<Link to={PATHS.CONTACT_US}>Contact Us</Link>
				</nav>
			</section>
			<section className={styles.socialMedia}>
				<Link to="">
					<FontAwesomeIcon icon={faTiktok} />
				</Link>
				<Link to="">
					<FontAwesomeIcon icon={faInstagram} />
				</Link>
				<Link to="">
					<FontAwesomeIcon icon={faSnapchat} />
				</Link>
				<Link to="">
					<FontAwesomeIcon icon={faYoutube} />
				</Link>
			</section> 
		</footer>
	);
};
export default Footer;
