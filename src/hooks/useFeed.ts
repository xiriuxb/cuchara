import { useInfiniteQuery } from "@tanstack/react-query";
import { FeedService, FeedResponse, ApiError } from "@/services/feedService";

export const useFeed = () => {
  return useInfiniteQuery<FeedResponse, ApiError>({
    queryKey: ["feed"],
    queryFn: async ({ pageParam }) => {
      return FeedService.getFeed(pageParam as string | undefined);
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}; 