import { useQuery } from "@tanstack/react-query";
import { FollowService } from "@/services/followService";
import { useAuth } from "@clerk/nextjs";

export const useIsFollowing = (targetId: string) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["isFollowing", targetId],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("No authentication token available");
      }
      const response = await FollowService.isFollowing(targetId, token);
      return response;
    },
    enabled: !!targetId,
    staleTime: 0, // Siempre revalidar al montar el componente
    refetchOnMount: true, // Refetch al montar el componente
  });
}; 