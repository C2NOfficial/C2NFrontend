import styles from "./Products.module.css";
import DialogWizard from "../../../components/DialogWizard/DialogWizard";
import { useEffect, useRef, useState } from "react";
import useCreateProduct from "../hooks/useCreateProduct";
import {
	defaultProductFormErrors,
	defaultProductForm,
	type ProductDialogViewValidators,
} from "../model";
import getProductDialogViewSteps from "./AddProductDialogViews";
import {
	validateAdditionalInfo,
	validateBasicInfo,
	validateInventory,
	validateMedia,
	validatePricing,
	validateShipping,
} from "../validation";
import useFetchCategories from "../../categories/hooks/useFetchCategories";
import useFetchProducts from "../hooks/useFetchProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import useDeleteProduct from "../hooks/useDeleteProduct";
import useUpdateProduct from "../hooks/useUpdateProduct";
import sharedStyles from "../../shared/shared.module.css";
import SearchBar from "../../../components/SearchBar/SearchBar";
import useProductFilters from "../hooks/useProductFilters";

const Products = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { createProduct } = useCreateProduct();
	const {
		data: products,
		isLoading,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useFetchProducts();
	const { data } = useFetchCategories();
	const { deleteProduct } = useDeleteProduct();
	const { updateProduct } = useUpdateProduct();
	const [productForm, setProductForm] = useState(defaultProductForm);
	const [productFormErrors, setProductFormErrors] = useState(
		defaultProductFormErrors,
	);

	const { filteredProducts, setFilters, filters } = useProductFilters();
	const closeDialog = () => setIsDialogOpen(false);

	const productValidators = {
		validateBasicInfo: () =>
			validateBasicInfo(productForm, setProductFormErrors),
		validateMedia: () => validateMedia(productForm, setProductFormErrors),
		validatePricing: () =>
			validatePricing(productForm, setProductFormErrors),
		validateInventory: () =>
			validateInventory(productForm, setProductFormErrors),
		validateShipping: () =>
			validateShipping(productForm, setProductFormErrors),
		validateAdditionalInfo: () =>
			validateAdditionalInfo(productForm, setProductFormErrors),
	} as ProductDialogViewValidators;

	useEffect(() => {
		if (!data || data.length === 0) return;

		setProductForm((prev) => ({
			...prev,
			category: prev.category ?? data[0],
		}));

		if (productForm.media.length > 0) {
			setProductFormErrors((prev) => ({ ...prev, media: "" }));
		}
	}, [data, productForm.media]);

	const [isEditing, setIsEditing] = useState(false);
	const deleteConfirmationRef = useRef<HTMLDialogElement | null>(null);

	const handleDialogSubmit = async () => {
		if (isEditing) {
			await updateProduct(productForm);
		} else {
			await createProduct(productForm);
		}
		closeDialog();
	};

	if (isLoading) {
		return <p className={sharedStyles.initialLoadingText}>Loading...</p>;
	}

	if (!data || !products || !filteredProducts) {
		return <p className={sharedStyles.initialLoadingText}>No data</p>;
	}

	return (
		<section className={styles.adminProductSection}>
			<SearchBar
				onChange={(e) =>
					setFilters((prev) => ({
						...prev,
						searchText: e.target.value,
					}))
				}
				value={filters?.searchText}
				placeholder="Search a product"
			/>
			<button
				className={sharedStyles.addButton}
				onClick={() => {
					setIsEditing(false);
					setProductForm(defaultProductForm);
					setProductFormErrors(defaultProductFormErrors);
					setIsDialogOpen(true);
				}}
			>
				UPLOAD
			</button>
			<section className={styles.productsSection}>
				<table className={styles.productsTable}>
					<thead>
						<tr>
							<th>Product Name</th>
							<th>Image</th>
							<th>Quantity</th>
							<th>MRP</th>
							<th>SKU</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{filteredProducts.map((product) => (
							<tr key={product.id}>
								<td className={styles.productName}>
									{product.name}
								</td>
								<td>
									<img
										className={styles.productImage}
										src={product.media[0].url}
										alt={product.name}
									/>
								</td>
								<td>{product.quantity}</td>
								<td>₹{product.mrp}</td>
								<td>{product.sku}</td>
								<td>
									<div className={styles.actionButton}>
										<button
											className={styles.editButton}
											onClick={() => {
												setIsEditing(true);
												setProductForm(product);
												setIsDialogOpen(true);
											}}
										>
											<FontAwesomeIcon icon={faEdit} />
										</button>
										<button
											className={styles.deleteButton}
											onClick={() => {
												setProductForm(product);
												deleteConfirmationRef.current?.showModal();
											}}
										>
											<FontAwesomeIcon
												icon={faTrashCan}
											/>
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className={sharedStyles.paginationContainer}>
					{isFetchingNextPage && (
						<p className={sharedStyles.loadingText}>Loading...</p>
					)}
					{!hasNextPage && (
						<p className={sharedStyles.noMoreText}>
							No more products to load.
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
			<DialogWizard
				isOpen={isDialogOpen}
				onClose={closeDialog}
				views={getProductDialogViewSteps(
					productForm,
					setProductForm,
					productFormErrors,
					productValidators,
				)}
				submitButtonText={
					isEditing ? "Update Product" : "Create Product"
				}
				submitFunction={handleDialogSubmit}
				data={productForm}
			/>
			<ConfirmDialog
				dialogRef={deleteConfirmationRef}
				title="Are you sure?"
				message="Do you really want to delete this product? This action cannot be undone."
				confirmText="Delete"
				cancelText="Cancel"
				onConfirm={() => {
					if (!productForm.id) return;
					deleteProduct(productForm.id);
					deleteConfirmationRef.current?.close();
				}}
			/>
		</section>
	);
};
export default Products;
