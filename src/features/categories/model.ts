import type { QueryDocumentSnapshot } from "firebase/firestore";

interface CategoryForm{
	id?: string;
	slug: string;
	name: string;
	sizeChart: string[][];
}
export const defaultCategoryForm: CategoryForm = {
	name: "",
	sizeChart: [["", ""]],
	slug: "",
};

interface Category {
	readonly id: string;
	name: string;
	sizeChart: string[][];
	readonly slug: string;
	readonly createdAt: Date;
	readonly updatedAt: Date;
}

interface FetchCategoriesResult {
	categories: Category[];
	lastDoc: QueryDocumentSnapshot | null;
}

interface AddCategoryDialogViewsProps {
	category: CategoryForm;
	setCategory: React.Dispatch<React.SetStateAction<CategoryForm>>;
}

export type { Category, CategoryForm, FetchCategoriesResult, AddCategoryDialogViewsProps };
