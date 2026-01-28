import { useEffect, useState } from "react";
import styles from "./TopBar.module.css";

interface TopBarProps {
	barText: Array<string>;
}

const TopBar: React.FC<TopBarProps> = ({ barText }) => {
	const [text, setText] = useState<string>(barText[0]);

	useEffect(() => {
		const interval = setInterval(() => {
			const index = Math.floor(Math.random() * barText.length);
			setText(barText[index]);
		}, 2500);

		return () => clearInterval(interval);
	}, [barText]);

	return (
		<div className={styles.topBarDiv}>
			<p className={styles.text}>{text}</p>
		</div>
	);
};

export default TopBar;
