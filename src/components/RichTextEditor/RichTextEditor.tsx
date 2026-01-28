import ReactQuill from "react-quill-new";
import type { RichTextEditorProps } from "./models";
import styles from "./RichTextEditor.module.css";

const RichTextEditor = ({
	label,
	value,
	error,
	placeholder,
	onChange,
	preset,
}: RichTextEditorProps) => {
	return (
		<div className={styles.editorContainer}>
			<label className={styles.label}>{label}</label>
			<ReactQuill
				theme="snow"
				value={value}
				onChange={onChange}
				modules={preset.modules}
				formats={preset.formats}
				placeholder={placeholder}
				className={error ? styles.errorInput : ""}
			/>

			{error && <p className={styles.inputErrorMessage}>{error}</p>}
		</div>
	);
};
export default RichTextEditor;