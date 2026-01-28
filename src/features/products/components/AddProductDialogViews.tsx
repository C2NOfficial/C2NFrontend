import { useRef, useState } from "react";
import styles from "./AddProductDialogViews.module.css";
import dialogWizardStyles from "../../../components/DialogWizard/DialogWizard.module.css";
import "react-quill-new/dist/quill.snow.css";
import type {
	AddProductDialogViewsProps,
	MediaItem,
	ProductDialogViewValidators,
	ProductErrors,
	ProductForm,
} from "../model";
import RichTextEditor from "../../../components/RichTextEditor/RichTextEditor";
import {
	FULL_EDITOR,
	SIMPLE_EDITOR,
} from "../../../components/RichTextEditor/models";
import useFetchCategories from "../../categories/hooks/useFetchCategories";
import type { DialogWizardViewProps } from "../../../components/DialogWizard/DialogWizard";
import SelectMediaDialog from "../../media/components/SelectMediaDialog";

const ProductBasicInfo = ({
	product,
	setProduct,
	errors,
}: AddProductDialogViewsProps) => {
	const { data } = useFetchCategories();
	if (!data) return null;

	return (
		<div className={styles.addProductParentDiv}>
			<div className={dialogWizardStyles.formGroup}>
				<label>Product Name</label>
				<input
					type="text"
					value={product.name}
					onChange={(e) =>
						setProduct((prev) => ({
							...prev,
							name: e.target.value,
						}))
					}
					className={
						errors.productName ? dialogWizardStyles.errorInput : ""
					}
					placeholder="e.g. Classic White Hoodie"
					title="Enter a valid product name in Pascal Case"
					required
				/>
				{errors.productName && (
					<p className={dialogWizardStyles.inputErrorMessage}>
						{errors.productName}
					</p>
				)}
			</div>

			<div className={dialogWizardStyles.formGroup}>
				<RichTextEditor
					label="Description & Fit"
					placeholder="Describe your product..."
					value={product.description}
					error={errors.productDescription}
					onChange={(html) => {
						setProduct((prev) => {
							const updated = { ...prev, description: html };
							return updated;
						});
					}}
					preset={FULL_EDITOR}
				/>
			</div>

			<div className={dialogWizardStyles.formGroup}>
				<label>Category</label>
				<select
					className={
						errors.productCategory
							? dialogWizardStyles.errorInput
							: ""
					}
					defaultValue={data[0].id}
					onChange={(e) => {
						const category = data.find(
							(category) => category.id === e.target.value,
						);
						if (category) {
							setProduct((prev) => ({
								...prev,
								category: category,
							}));
						}
					}}
				>
					{data.map((category) => {
						return (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						);
					})}
				</select>
				{errors.productCategory && (
					<p className={dialogWizardStyles.inputErrorMessage}>
						{errors.productCategory}
					</p>
				)}
			</div>

			<div className={dialogWizardStyles.formGroup}>
				<label>Tags</label>
				<input
					className={
						errors.productTags ? dialogWizardStyles.errorInput : ""
					}
					value={product.tags.join(", ")}
					type="text"
					title="Enter tags separated by commas"
					placeholder="e.g. winter, cotton, limited edition"
					onChange={(e) => {
						const tags = e.target.value
							.split(",")
							.map((tag) => tag.trim().toLowerCase());
						setProduct((prev) => ({
							...prev,
							tags,
						}));
					}}
				/>
				{errors.productTags && (
					<p className={dialogWizardStyles.inputErrorMessage}>
						{errors.productTags}
					</p>
				)}
			</div>
		</div>
	);
};

const ProductMedia = ({
	product,
	setProduct,
	errors,
}: AddProductDialogViewsProps) => {
	const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
	const [selectedMedia, setSelectedMedia] = useState<MediaItem[]>([]);
	const mediaPopupDialogRef = useRef<HTMLDialogElement | null>(null);

	//Drag and drop for images to arrange their order
	const handleDragStart = (index: number) => {
		setDraggedIndex(index);
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault(); // allows dropping
	};

	const handleDrop = (index: number) => {
		if (draggedIndex === null || draggedIndex === index) return;
		const updated = [...product.media];
		const removed = updated.splice(draggedIndex, 1);
		updated.splice(index, 0, ...removed);
		setProduct((prev) => ({ ...prev, media: updated }));
		setDraggedIndex(null);
	};

	const handleMediaChange = (media: MediaItem[]) => {
		if (!media) return;
		const merged = [...product.media, ...media];

		const uniqueMedia = Array.from(
			new Map(merged.map((item) => [item.url, item])).values(),
		);

		setProduct((prev) => ({ ...prev, media: uniqueMedia }));
	};

	return (
		<div className={styles.addProductParentDiv}>
			<SelectMediaDialog
				dialogRef={mediaPopupDialogRef}
				onSelect={handleMediaChange}
				selectedMedia={selectedMedia}
				setSelectedMedia={setSelectedMedia}
			/>
			<div className={dialogWizardStyles.formGroup}>
				<label>Product Media</label>

				<div className={styles.imagesDiv}>
					{product.media.length > 0 && (
						<div className={styles.imagePreviewGrid}>
							{product.media.map((item, index) => (
								<div
									key={index}
									className={styles.imagePreview}
									onDragStart={() => handleDragStart(index)}
									onDragOver={handleDragOver}
									onDrop={() => handleDrop(index)}
								>
									{item.type === "image" ? (
										<img
											key={item.url}
											src={item.url}
											alt={`preview-${index}`}
										/>
									) : (
										<video
											src={item.url}
											muted
											loop
											playsInline
											preload="auto"
											className={styles.videoPreview}
											onMouseEnter={(e) => {
												const video = e.currentTarget;
												video.currentTime = 0;
												video.play().catch(() => {});
											}}
											onMouseLeave={(e) => {
												const video = e.currentTarget;
												video.pause();
												video.currentTime = 0;
											}}
										/>
									)}
									<button
										onClick={() =>
											setProduct((prev) => ({
												...prev,
												media: prev.media.filter(
													(_, i) => i !== index,
												),
											}))
										}
									>
										&times;
									</button>
								</div>
							))}
						</div>
					)}
					<div
						className={
							!errors.media
								? styles.imageUploadBox
								: styles.errorImageUploadBox
						}
						onClick={() => {
							setSelectedMedia([]);
							mediaPopupDialogRef.current?.showModal();
						}}
					>
						<span
							className={
								!errors.media
									? styles.plusSign
									: styles.errorPlusSign
							}
						>
							+
						</span>
					</div>
				</div>
				{errors.media && (
					<p className={dialogWizardStyles.inputErrorMessage}>
						{errors.media}
					</p>
				)}
			</div>
		</div>
	);
};

const ProductPricing = ({
	product,
	setProduct,
	errors,
}: AddProductDialogViewsProps) => {
	return (
		<div className={styles.addProductParentDiv}>
			<div className={dialogWizardStyles.formGroup}>
				<label>MRP (Before Discount)</label>
				<input
					value={product.mrp}
					className={errors.mrp ? dialogWizardStyles.errorInput : ""}
					type="number"
					placeholder="e.g. ₹1299"
					onChange={(e) =>
						setProduct((prev) => ({
							...prev,
							mrp: Number(e.target.value),
						}))
					}
				/>
				{errors.mrp && (
					<p className={dialogWizardStyles.inputErrorMessage}>
						{errors.mrp}
					</p>
				)}
			</div>

			<div className={dialogWizardStyles.formGroup}>
				<label>Selling Price</label>
				<input
					value={product.sellingPrice}
					className={
						errors.sellingPrice ? dialogWizardStyles.errorInput : ""
					}
					type="number"
					placeholder="e.g. ₹899"
					onChange={(e) =>
						setProduct((prev) => ({
							...prev,
							sellingPrice: Number(e.target.value),
						}))
					}
				/>
				{errors.sellingPrice && (
					<p className={dialogWizardStyles.inputErrorMessage}>
						{errors.sellingPrice}
					</p>
				)}
			</div>

			<div className={dialogWizardStyles.formGroup}>
				<label>Cost to make</label>
				<input
					value={product.costToMake}
					className={
						errors.costToMake ? dialogWizardStyles.errorInput : ""
					}
					type="number"
					placeholder="e.g. ₹400"
					onChange={(e) =>
						setProduct((prev) => ({
							...prev,
							costToMake: Number(e.target.value),
						}))
					}
				/>
				{errors.costToMake && (
					<p className={dialogWizardStyles.inputErrorMessage}>
						{errors.costToMake}
					</p>
				)}
			</div>
		</div>
	);
};

const ProductInventory = ({
	product,
	setProduct,
	errors,
}: AddProductDialogViewsProps) => {
	return (
		<div className={styles.addProductParentDiv}>
			<div className={dialogWizardStyles.formGroup}>
				<label>Quantity Available</label>
				<input
					type="number"
					className={
						errors.quantity ? dialogWizardStyles.errorInput : ""
					}
					placeholder="Only enter whole numbers"
					value={product.quantity}
					onChange={(e) =>
						setProduct((prev) => ({
							...prev,
							quantity: Number(e.target.value),
						}))
					}
				/>
				{errors.quantity && (
					<p className={dialogWizardStyles.inputErrorMessage}>
						{errors.quantity}
					</p>
				)}
			</div>
			<div className={dialogWizardStyles.formGroup}>
				<label>SKU</label>
				<input
					type="text"
					className={errors.sku ? dialogWizardStyles.errorInput : ""}
					placeholder="Eg: 2321asdf11bb2"
					value={product.sku}
					onChange={(e) =>
						setProduct((prev) => ({ ...prev, sku: e.target.value }))
					}
				/>
				{errors.sku && (
					<p className={dialogWizardStyles.inputErrorMessage}>
						{errors.sku}
					</p>
				)}
			</div>
			<div className={dialogWizardStyles.formGroup}>
				<label>
					<input
						type="checkbox"
						checked={product.allowOutOfStockPurchase}
						onChange={(e) =>
							setProduct((prev) => ({
								...prev,
								allowOutOfStockPurchase: e.target.checked,
							}))
						}
					/>
					Allow customers to purchase when out of stock
				</label>
			</div>
		</div>
	);
};

const ProductShipping = ({
	product,
	setProduct,
	errors,
}: AddProductDialogViewsProps) => (
	<div className={styles.addProductParentDiv}>
		<div className={dialogWizardStyles.formGroup}>
			<label>Weight (kg)</label>
			<input
				type="number"
				className={errors.weight ? dialogWizardStyles.errorInput : ""}
				placeholder="Eg: 0.5"
				value={product.weight}
				onChange={(e) =>
					setProduct((prev) => ({
						...prev,
						weight: Number(e.target.value),
					}))
				}
			/>
			{errors.weight && (
				<p className={dialogWizardStyles.inputErrorMessage}>
					{errors.weight}
				</p>
			)}
		</div>

		<div className={dialogWizardStyles.formGroup}>
			<label>Length (cm)</label>
			<input
				type="number"
				className={errors.length ? dialogWizardStyles.errorInput : ""}
				placeholder="Eg: 30"
				value={product.length}
				onChange={(e) =>
					setProduct((prev) => ({
						...prev,
						length: Number(e.target.value),
					}))
				}
			/>
			{errors.length && (
				<p className={dialogWizardStyles.inputErrorMessage}>
					{errors.length}
				</p>
			)}
		</div>

		<div className={dialogWizardStyles.formGroup}>
			<label>Width (cm)</label>
			<input
				type="number"
				className={errors.width ? dialogWizardStyles.errorInput : ""}
				placeholder="Eg: 20"
				value={product.width}
				onChange={(e) =>
					setProduct((prev) => ({
						...prev,
						width: Number(e.target.value),
					}))
				}
			/>
			{errors.width && (
				<p className={dialogWizardStyles.inputErrorMessage}>
					{errors.width}
				</p>
			)}
		</div>

		<div className={dialogWizardStyles.formGroup}>
			<label>Height (cm)</label>
			<input
				type="number"
				className={errors.height ? dialogWizardStyles.errorInput : ""}
				placeholder="Eg: 10"
				value={product.height}
				onChange={(e) =>
					setProduct((prev) => ({
						...prev,
						height: Number(e.target.value),
					}))
				}
			/>
			{errors.height && (
				<p className={dialogWizardStyles.inputErrorMessage}>
					{errors.height}
				</p>
			)}
		</div>
	</div>
);

const AdditionalInformation = ({
	product,
	setProduct,
	errors,
}: AddProductDialogViewsProps) => {
	return (
		<div className={styles.addProductParentDiv}>
			<RichTextEditor
				label="Materials"
				placeholder="Describe the materials used..."
				value={product.materials}
				error={errors.materials}
				onChange={(html) =>
					setProduct((prev) => {
						const updated = { ...prev, materials: html };
						return updated;
					})
				}
				preset={SIMPLE_EDITOR}
			/>
			<RichTextEditor
				label="Care Guide"
				placeholder="Wash the clothes with..."
				value={product.careGuide}
				error={errors.careGuide}
				onChange={(html) =>
					setProduct((prev) => {
						const updated = { ...prev, careGuide: html };
						return updated;
					})
				}
				preset={SIMPLE_EDITOR}
			/>
			<RichTextEditor
				label="Delivery, Payments & Returns"
				placeholder="Returns are unavailable for hygenic ..."
				value={product.deliveryPaymentReturnInfo}
				error={errors.deliveryPaymentReturnInfo}
				onChange={(html) =>
					setProduct((prev) => {
						const updated = {
							...prev,
							deliveryPaymentReturnInfo: html,
						};
						return updated;
					})
				}
				preset={SIMPLE_EDITOR}
			/>
		</div>
	);
};

const getProductDialogViewSteps = (
	product: ProductForm,
	setProduct: React.Dispatch<React.SetStateAction<ProductForm>>,
	errors: ProductErrors,
	validators: ProductDialogViewValidators,
): DialogWizardViewProps<ProductForm>[] => {
	return [
		{
			title: "Basic Info",
			view: (
				<ProductBasicInfo
					product={product}
					setProduct={setProduct}
					errors={errors}
				/>
			),
			validate: validators.validateBasicInfo,
		},
		{
			title: "Media",
			view: (
				<ProductMedia
					product={product}
					setProduct={setProduct}
					errors={errors}
				/>
			),
			validate: validators.validateMedia,
		},
		{
			title: "Pricing",
			view: (
				<ProductPricing
					product={product}
					setProduct={setProduct}
					errors={errors}
				/>
			),
			validate: validators.validatePricing,
		},
		{
			title: "Inventory",
			view: (
				<ProductInventory
					product={product}
					setProduct={setProduct}
					errors={errors}
				/>
			),
			validate: validators.validateInventory,
		},
		{
			title: "Shipping",
			view: (
				<ProductShipping
					product={product}
					setProduct={setProduct}
					errors={errors}
				/>
			),
			validate: validators.validateShipping,
		},
		{
			title: "Additional Information",
			view: (
				<AdditionalInformation
					product={product}
					setProduct={setProduct}
					errors={errors}
				/>
			),
			validate: validators.validateAdditionalInfo,
		},
	];
};
export default getProductDialogViewSteps;
