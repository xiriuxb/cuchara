import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FollowService, FollowResponse } from "@/services/followService";
import { useAuth } from "@clerk/nextjs";

export const useFollow = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<FollowResponse, Error, { followingId: string }>({
    mutationFn: async ({ followingId }) => {
      const token = await getToken();
      if (!token) {
        throw new Error("No authentication token available");
      }
      return FollowService.followUser(followingId, token);
    },
    onSuccess: (data, variables) => {
      // Actualiza la query de isFollowing con la nueva respuesta
      queryClient.setQueryData(["isFollowing", variables.followingId], data);
    },
  });
}; 