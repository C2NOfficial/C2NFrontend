import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCategoriesFromFirestore } from "../service";
import type { Category, FetchCategoriesResult } from "../model";
import type { QueryDocumentSnapshot } from "firebase/firestore";

const useFetchCategories = () => {
	return useInfiniteQuery<
		FetchCategoriesResult,
		Error,
		Category[],
		["categories"],
		QueryDocumentSnapshot | undefined
	>({
		queryKey: ["categories"],
		queryFn: ({ pageParam }) => fetchCategoriesFromFirestore(pageParam),
		initialPageParam: undefined,
		getNextPageParam: (lastPage) => lastPage.lastDoc ?? undefined,
		select: (data) =>
			data.pages.flatMap((page) => page.categories),
	});
};

export default useFetchCategories;
