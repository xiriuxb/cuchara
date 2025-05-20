import { useQuery } from "@tanstack/react-query";
import { CommentService } from "@/services/commentService";
import { useAuth } from "@clerk/nextjs";

export const useComments = (recipeId: string) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["comments", recipeId],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error("No authentication token found");
      return CommentService.getComments(recipeId, token);
    },
  });
}; 