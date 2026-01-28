export type RichTextEditorProps = {
	label: string;
	value: string;
	error?: string;
	placeholder: string;
	preset: RichTextEditorPreset;
	onChange: (value: string) => void;
};

export type RichTextEditorPreset = {
	modules: any;
	formats: string[];
};

export const FULL_EDITOR = {
	modules: {
		toolbar: [
			[{ header: [1, 2, 3, false] }],
			["bold", "italic", "underline", "strike", "blockquote"],
			[{ list: "ordered" }, { list: "bullet" }],
			[{ script: "sub" }, { script: "super" }],
			[{ indent: "-1" }, { indent: "+1" }],
			[{ align: [] }],
			[{ color: [] }, { background: [] }],
			["link", "image", "video"],
			["clean"],
		],
	},
	formats: [
		"header",
		"bold",
		"italic",
		"underline",
		"strike",
		"blockquote",
		"list",
		"indent",
		"script",
		"align",
		"color",
		"background",
		"link",
		"image",
		"video",
	],
};

export const SIMPLE_EDITOR = {
	modules: {
		toolbar: [
			[{ header: [1, 2, 3, false] }],
			["bold", "italic", "underline"],
			[{ list: "ordered" }, { list: "bullet" }],
			["link"],
		],
	},
	formats: ["header", "bold", "italic", "underline", "list", "link"],
};
