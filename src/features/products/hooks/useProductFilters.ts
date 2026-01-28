import useFetchProducts from "./useFetchProducts";
import type { ProductFilters } from "../model";
import { useMemo, useState } from "react";

const useProductFilters = () => {
	const { data: products } = useFetchProducts();
	const [filters, setFilters] = useState<ProductFilters>({
		searchText: "",
	});

	const filteredProducts = useMemo(() => {
		if (!products) return [];

		const query = filters.searchText.trim().toLowerCase();
		if (!query) return products;

		return products.filter(
			(product) =>
				product.name.toLowerCase().includes(query) ||
				product.sku.toLowerCase().includes(query),
		);
	}, [products, filters.searchText]);

	return { filteredProducts, filters, setFilters };
};

export default useProductFilters;
