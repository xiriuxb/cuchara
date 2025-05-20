import { useInfiniteQuery } from "@tanstack/react-query";
import { RecipeService, RecipeResponse, ApiError } from "@/services/recipeService";
import { useAuth } from "@clerk/nextjs";

export const useMyRecipes = () => {
  const { getToken } = useAuth();

  return useInfiniteQuery<RecipeResponse, ApiError>({
    queryKey: ["my-recipes"],
    queryFn: async ({ pageParam }) => {
      const token = await getToken();
      if (!token) throw new Error("No authentication token available");
      return RecipeService.getMyRecipes(token, pageParam as string | undefined);
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}; 