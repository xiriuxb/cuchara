import { Button } from "@/components/ui/button";
import { useFollow } from "@/hooks/useFollow";
import { useIsFollowing } from "@/hooks/useIsFollowing";

interface FollowButtonProps {
  targetId: string;
}

export const FollowButton = ({ targetId }: FollowButtonProps) => {
  const { data: followData, isLoading: isLoadingFollow } = useIsFollowing(targetId);
  const follow = useFollow();

  const handleFollow = async () => {
    try {
      await follow.mutateAsync({ followingId: targetId });
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  if (isLoadingFollow) {
    return <Button disabled>Cargando...</Button>;
  }

  return (
    <Button 
      onClick={handleFollow}
      disabled={follow.isPending}
      variant={followData?.followed ? "secondary" : "default"}
    >
      {follow.isPending ? "Siguiendo..." : followData?.followed ? "Dejar de seguir" : "Seguir"}
    </Button>
  );
}; 