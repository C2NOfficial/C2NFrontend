import { useInfiniteQuery } from "@tanstack/react-query";
import type {
  MediaFetchedResponse,
  MediaFlattened,
  MediaPageTokens,
} from "../model";
import { fetchMediaInParallel } from "../service";

export const useFetchMedia = () => {
  return useInfiniteQuery<
    MediaFetchedResponse,
    Error,
    MediaFlattened,
    ["media"],
    MediaPageTokens
  >({
    queryKey: ["media"],

    queryFn: ({ pageParam }) =>
      fetchMediaInParallel(
        pageParam ?? { images: undefined, videos: undefined },
      ),

    initialPageParam: {
      images: undefined,
      videos: undefined,
    },

    getNextPageParam: (lastPage) => {
      const { images, videos } = lastPage.nextPageTokens;

      // Stop pagination if both are exhausted
      if (!images && !videos) return undefined;

      return {
        images,
        videos,
      };
    },
    select: (data) => {
      const imageSet = new Set<string>();
      const videoSet = new Set<string>();

      data.pages.forEach((page) => {
        page.images.forEach((url) => imageSet.add(url));
        page.videos.forEach((url) => videoSet.add(url));
      });

      return {
        images: Array.from(imageSet),
        videos: Array.from(videoSet),
      };
    },
    staleTime: 1000 * 60 * 20,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};
