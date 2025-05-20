import { useInfiniteQuery } from "@tanstack/react-query";
import { RecipeService, Recipe, ApiError } from "@/services/recipeService";
import { useAuth } from "@clerk/nextjs";

export const useUserRecipes = (username: string) => {
  const { getToken } = useAuth();

  return useInfiniteQuery<{ data: Recipe[]; nextCursor?: string }, ApiError>({
    queryKey: ["user-recipes", username],
    queryFn: async ({ pageParam }) => {
      const token = await getToken();
      if (!token) {
        throw new Error("No authentication token available");
      }
      return RecipeService.getUserRecipes(username, token, pageParam as string | undefined);
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}; 