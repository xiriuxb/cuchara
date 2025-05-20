import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentService } from "@/services/commentService";
import { useAuth } from "@clerk/nextjs";

export const useComment = (recipeId: string) => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      const token = await getToken();
      if (!token) {
        throw new Error("No authentication token found");
      }
      return CommentService.createComment(recipeId, content, token);
    },
    onSuccess: () => {
      // Invalidate and refetch comments
      queryClient.invalidateQueries({ queryKey: ["comments", recipeId] });
    },
  });
}; 