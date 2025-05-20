import { useQuery } from "@tanstack/react-query";
import { UserService, UserData, ApiError } from "@/services/userService";
import { useAuth } from "@clerk/nextjs";

export const useUserData = (username: string) => {
  const { getToken } = useAuth();

  return useQuery<UserData, ApiError>({
    queryKey: ["user", username],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("No authentication token available");
      }
      return UserService.getUserData(username, token);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}; 