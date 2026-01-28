import { useRef, useState } from "react";
import styles from "./Categories.module.css";
import sharedStyles from "../../shared/shared.module.css";
import useCreateCategory from "../hooks/useCreateCategory";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import { getCategoryDialogViews } from "./AddCategoryDialogViews";
import DialogWizard from "../../../components/DialogWizard/DialogWizard";
import useFetchCategories from "../hooks/useFetchCategories";
import useDeleteCategory from "../hooks/useDeleteCategory";
import { defaultCategoryForm, type CategoryForm } from "../model";
import useUpdateCategory from "../hooks/useUpdateCategory";

const Categories = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const openDialog = () => setIsDialogOpen(true);
	const closeDialog = () => setIsDialogOpen(false);

	const deleteConfirmationRef = useRef<HTMLDialogElement>(null);

	const { createCategory } = useCreateCategory();
	const { deleteCategory } = useDeleteCategory();
	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
		useFetchCategories();
	const { updateCategory } = useUpdateCategory();

	const [isEditing, setIsEditing] = useState(false);
	const [categoryForm, setCategoryForm] =
		useState<CategoryForm>(defaultCategoryForm);

	if (isLoading) {
		return <p className={sharedStyles.initialLoadingText}>Loading...</p>;
	}

	if (!data) {
		return <p className={sharedStyles.initialLoadingText}>No data</p>;
	}

	const handleDialogSubmit = async () => {
		if (isEditing) {
			await updateCategory(categoryForm);
		} else {
			await createCategory(categoryForm);
		}
		closeDialog();
	};

	return (
		<section className={styles.categoriesSection}>
			<button
				className={sharedStyles.addButton}
				onClick={() => {
					setIsEditing(false);
					setCategoryForm(defaultCategoryForm);
					openDialog();
				}}
			>
				CREATE
			</button>
			<DialogWizard
				isOpen={isDialogOpen}
				onClose={closeDialog}
				views={getCategoryDialogViews(categoryForm, setCategoryForm)}
				submitButtonText={
					isEditing ? "Update Category" : "Create Category"
				}
				submitFunction={handleDialogSubmit}
				data={categoryForm}
			/>
			<section className={styles.categoriesDisplaySection}>
				{data.map((category) => (
					<div key={category.id} className={styles.categoryCard}>
						<div className={styles.categoryHeader}>
							<h3>{category.name}</h3>

							<div className={styles.actions}>
								<button
									className={styles.editBtn}
									onClick={() => {
										setIsEditing(true);
										setCategoryForm(category);
										openDialog();
									}}
								>
									Edit
								</button>

								<button
									className={styles.deleteBtn}
									onClick={() => {
										setCategoryForm(category);
										deleteConfirmationRef.current?.showModal();
									}}
								>
									Delete
								</button>
							</div>
						</div>

						<details className={styles.sizeChart}>
							<summary>View Size Chart</summary>

							<table>
								<tbody>
									{category.sizeChart.map((row, i) => (
										<tr key={i}>
											{row.map((cell, j) => (
												<td key={j}>{cell}</td>
											))}
										</tr>
									))}
								</tbody>
							</table>
						</details>
					</div>
				))}
				<div className={sharedStyles.paginationContainer}>
					{isFetchingNextPage && (
						<p className={sharedStyles.loadingText}>Loading...</p>
					)}
					{!hasNextPage && (
						<p className={sharedStyles.noMoreText}>
							No more categories to load.
						</p>
					)}
					{hasNextPage && !isFetchingNextPage && (
						<button
							className={sharedStyles.loadMoreButton}
							onClick={() => fetchNextPage()}
						>
							Load More
						</button>
					)}
				</div>
			</section>

			<ConfirmDialog
				dialogRef={deleteConfirmationRef}
				title="Are you sure?"
				message="Do you really want to delete this category? This action cannot be undone."
				confirmText="Delete"
				cancelText="Cancel"
				onConfirm={() => {
					if (!categoryForm.id) {
						return;
					}
					deleteCategory(categoryForm.id);
					deleteConfirmationRef.current?.close();
				}}
			/>
		</section>
	);
};

export default Categories;
