import { InfiniteData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LikeService } from "@/services/likeService";
import { useAuth } from "@clerk/nextjs";
import { Recipe } from "@/services/recipeService";
import { FeedRecipe, FeedResponse } from "@/services/feedService";

export const useLike = (recipeId: string) => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const { data: hasLiked } = useQuery({
    queryKey: ["hasLiked", recipeId],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error("No token available");
      const res = await LikeService.hasUserLiked(recipeId, token);
      return res.liked;
    },
  });

  const toggleLike = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      if (!token) throw new Error("No token available");
      return LikeService.toggleLike(recipeId, token);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["hasLiked", recipeId], data.liked);

      queryClient.setQueryData(["recipe", recipeId], (old: Recipe) => {
        if (!old) return old;
        return {
          ...old,
          likesCount: data.liked
            ? (old.likesCount || 0) + 1
            : Math.max(0, (old.likesCount || 0) - 1),
        };
      });

      queryClient.setQueryData(['feed'], (old: InfiniteData<FeedResponse>) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: FeedResponse) => ({
            ...page,
            data: page.data.map((rec: FeedRecipe) => {
              if (rec._id === recipeId) {
                return {
                  ...rec,
                  likesCount: data.liked
                    ? (rec.likesCount || 0) + 1
                    : Math.max(0, (rec.likesCount || 0) - 1)
                };
              }
              return rec;
            })
          }))
        };
      });
    },
  });

  return {
    hasLiked,
    toggleLike: toggleLike.mutate,
    isPending: toggleLike.isPending,
  };
};
