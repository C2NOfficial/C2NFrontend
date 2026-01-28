import styles from "./AddCategoryDialogViews.module.css";
import dialogWizardStyles from "../../../components/DialogWizard/DialogWizard.module.css";
import type { AddCategoryDialogViewsProps, CategoryForm } from "../model";
import type { DialogWizardViewProps } from "../../../components/DialogWizard/DialogWizard";
import { validateCategoryName } from "../service";

const CategoryName = ({
	category,
	setCategory,
}: AddCategoryDialogViewsProps) => {
	return (
		<div className={dialogWizardStyles.formGroup}>
			<input
				type="text"
				placeholder="Eg: Tshirts"
				value={category.name}
				onChange={(e) =>
					setCategory({ ...category, name: e.target.value })
				}
			/>
		</div>
	);
};

const SizeChart = ({ category, setCategory }: AddCategoryDialogViewsProps) => {
	const addRow = () => {
		if (category.sizeChart.length === 20) return;

		const maxColumns = category.sizeChart
			.map((row) => row.length)
			.reduce((a, b) => Math.max(a, b), 0);

		setCategory({
			...category,
			sizeChart: [...category.sizeChart, Array(maxColumns).fill("")],
		});
	};

	const removeRow = (index: number) => {
		if (category.sizeChart.length === 1) return;

		setCategory({
			...category,
			sizeChart: [
				...category.sizeChart.slice(0, index),
				...category.sizeChart.slice(index + 1),
			],
		});
	};

	const addColumn = () => {
		if (category.sizeChart[0].length === 10) return;

		setCategory({
			...category,
			sizeChart: category.sizeChart.map((row) => [...row, ""]),
		});
	};

	const removeColumn = (index: number) => {
		if (category.sizeChart[0].length === 1) return;

		setCategory({
			...category,
			sizeChart: category.sizeChart.map((row) => [
				...row.slice(0, index),
				...row.slice(index + 1),
			]),
		});
	};

	return (
		<div className={styles.sizeChartDiv}>
			<div className={styles.addRowColButtonDiv}>
				<button onClick={addRow}>Add Row</button>
				<button onClick={addColumn}>Add Column</button>
			</div>

			<div className={styles.sizeChartInputParentDiv}>
				{category.sizeChart.map((row, rowIndex) => (
					<div key={rowIndex} className={styles.inputCellRows}>
						<button
							onClick={() => removeRow(rowIndex)}
							className={styles.rowRemoveButton}
						>
							&times;
						</button>

						{row.map((_, columnIndex) => (
							<div key={columnIndex}>
								{rowIndex === 0 && (
									<button
										onClick={() =>
											removeColumn(columnIndex)
										}
										className={styles.colRemoveButton}
									>
										&times;
									</button>
								)}

								<div>
									<input
										type="text"
										placeholder="Eg: 20"
										value={
											category.sizeChart[rowIndex][
												columnIndex
											]
										}
										onChange={(e) => {
											const newValue = e.target.value;

											setCategory((prev) => {
												const updatedChart = [
													...prev.sizeChart,
												];

												const updatedRow = [
													...updatedChart[rowIndex],
												];

												updatedRow[columnIndex] =
													newValue;

												updatedChart[rowIndex] =
													updatedRow;

												return {
													...prev,
													sizeChart: updatedChart,
												};
											});
										}}
									/>
								</div>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export const getCategoryDialogViews = (
	category: CategoryForm,
	setCategory:
		| React.Dispatch<React.SetStateAction<CategoryForm>>
): DialogWizardViewProps<CategoryForm>[] => {
	return [
		{
			title: "Name",
			view: (
				<CategoryName category={category} setCategory={setCategory} />
			),
			validate: validateCategoryName,
		},
		{
			title: "Size Chart",
			view: <SizeChart category={category} setCategory={setCategory} />,
			validate: () => true,
		},
	];
};
