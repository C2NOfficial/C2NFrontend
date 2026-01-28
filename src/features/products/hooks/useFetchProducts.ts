import { useInfiniteQuery } from "@tanstack/react-query";
import type { FetchProductsResult, Product } from "../model";
import type { QueryDocumentSnapshot } from "firebase/firestore";
import { fetchProductsFromFirestore } from "../service";
import useFetchCategories from "../../categories/hooks/useFetchCategories";

const useFetchProducts = () => {
	const { data: categories } = useFetchCategories();

	return useInfiniteQuery<
		FetchProductsResult,
		Error,
		Product[],
		["products"],
		QueryDocumentSnapshot | undefined
	>({
		queryKey: ["products"],

		queryFn: ({ pageParam }) => {
			return fetchProductsFromFirestore(pageParam);
		},

		initialPageParam: undefined,

		getNextPageParam: (lastPage) => lastPage.lastDoc ?? undefined,

		select: (data) => {
			if (!categories) return [];
			return data.pages.flatMap((page) =>
				page.products.map((product) => {
					const category = categories.find(
						(c) => c.id === product.category.id,
					);

					return {
						...product,
						category: category ?? product.category,
					};
				}),
			);
		},
	});
};

export default useFetchProducts;
