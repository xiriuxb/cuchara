/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { RecipeService, ApiResponse, ApiError } from "@/services/recipeService";
import { RecipeCreateEntity } from "@/entities/RecipeCreateEntity";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Recipe, ApiError as RecipeApiError } from "@/services/recipeService";

export const useCreateRecipe = () => {
  const { getToken } = useAuth();
  const router = useRouter();

  return useMutation<ApiResponse<any>, ApiError, RecipeCreateEntity>({
    mutationFn: async (recipe: RecipeCreateEntity) => {
      const token = await getToken();
      if (!token) throw new Error("No authentication token available");
      return RecipeService.createRecipe(recipe, token);
    },
    onSuccess: (data: ApiResponse<any>) => {
      console.log("Recipe created successfully:", data);
      router.replace(`/recipe/${data._id}`)
    },
    onError: (error: ApiError) => {
      console.error("Error creating recipe:", error.message);
    },
  });
};

export const useRecipe = (id: string) => {
  const { getToken } = useAuth();

  return useQuery<Recipe, RecipeApiError>({
    queryKey: ["recipe", id],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error("No authentication token available");
      return RecipeService.getRecipeById(id, token);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    retryDelay: 1000,
  });
}; 