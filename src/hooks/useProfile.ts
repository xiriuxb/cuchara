import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileService, UserProfile, ApiError } from "@/services/profileService";
import { useAuth } from "@clerk/nextjs";

export const useProfile = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery<UserProfile, ApiError>({
    queryKey: ["profile"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error("No authentication token available");
      return ProfileService.getProfile(token);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const updateProfile = useMutation<{bio:string}, ApiError, string>({
    mutationFn: async (bio) => {
      const token = await getToken();
      if (!token) throw new Error("No authentication token available");
      return ProfileService.updateProfile(token, bio);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  return {
    ...query,
    updateProfile,
  };
}; 