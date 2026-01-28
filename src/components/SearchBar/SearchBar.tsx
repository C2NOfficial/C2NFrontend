import styles from "./SearchBar.module.css";

interface SearchBarProps {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	value: string;
}

const SearchBar = ({ onChange, placeholder, value }: SearchBarProps) => {
	return (
		<input
			className={styles.searchInput}
			onChange={onChange}
			placeholder={placeholder}
			value={value}
			type="search"
		/>
	);
};

export default SearchBar;