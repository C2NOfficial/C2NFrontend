import { useEffect, type RefObject, useState } from "react";
import styles from "./TermsAndConditions.module.css";

interface TermsAndConditionsDialogProps {
	showDialogRef: RefObject<HTMLDialogElement>;
	setAccepted: (value: boolean) => void;
}

const populateTermsAndConditionsFromJson = (terms: any) => {
	return (
		<>
			<h1 className={styles.title}>{terms.title}</h1>
			<p className={styles.lastUpdated}>
				Last updated at: {terms.last_updated}
			</p>
			<p className={styles.paragraph}>{terms.intro.text}</p>
			{terms.sections.map((section: any) => (
				<>
					<h2 className={styles.sectionTitle}>{section.title}</h2>
					{section.contentType === "paragraph" && (
						<>
							<p className={styles.paragraph}>
								{section.content}
							</p>
							{section.contact && (
								<p>
									<strong>Email: </strong>
									{section.contact.email}
									<br />
									<strong>Phone: </strong>
									{section.contact.phone}
								</p>
							)}
						</>
					)}
					{section.contentType === "list" && (
						<ul className={styles.list}>
							{section.content.map((item: any) => (
								<li>{item}</li>
							))}
						</ul>
					)}
				</>
			))}
		</>
	);
};

const TermsAndConditionsDialog = ({
	showDialogRef,
	setAccepted,
}: TermsAndConditionsDialogProps) => {
	const [terms, setTerms] = useState<any>(null);

	useEffect(() => {
		fetch("/terms_and_conditions.json")
			.then((res) => res.json())
			.then((data) => {
				data.sections = data.sections.map((section: any) => {
					if (section.contact) {
						section.contact.email =
							import.meta.env.VITE_COMPANY_EMAIL;
						section.contact.phone =
							import.meta.env.VITE_COMPANY_PHONE;
					}
					return section;
				});
				setTerms(data);
			})
			.catch((err) => console.error("Failed to load terms:", err));
	}, []);

	return (
		<dialog ref={showDialogRef} className={styles.termsAndConditionsDialog}>
			<button
				onClick={() => showDialogRef.current?.close()}
				className={styles.closeButton}
			>
				&times;
			</button>
			{terms && populateTermsAndConditionsFromJson(terms)}
			<div className={styles.agreebuttonDiv}>
				<button
					onClick={() => {
						setAccepted(false);
						showDialogRef.current?.close();
					}}
				>
					Disagree
				</button>
				<button
					onClick={() => {
						setAccepted(true);
						showDialogRef.current?.close();
					}}
				>
					Agree
				</button>
			</div>
		</dialog>
	);
};

const TermsAndConditions = () => {
	const [terms, setTerms] = useState<any>(null);

	useEffect(() => {
		fetch("/terms_and_conditions.json")
			.then((res) => res.json())
			.then((data) => {
				data.sections = data.sections.map((section: any) => {
					if (section.contact) {
						section.contact.email =
							import.meta.env.VITE_COMPANY_EMAIL;
						section.contact.phone =
							import.meta.env.VITE_COMPANY_PHONE;
					}
					return section;
				});
				setTerms(data);
			})
			.catch((err) => console.error("Failed to load terms:", err));
	}, []);

	return (
		<section className={styles.container}>
			{terms && populateTermsAndConditionsFromJson(terms)}
		</section>
	);
};
export { TermsAndConditionsDialog };
export default TermsAndConditions;
