'use client'

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLike } from "@/hooks/useLike";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  recipeId: string;
  likesCount: number;
  className?: string;
}

export function LikeButton({ recipeId, likesCount, className }: LikeButtonProps) {
  const { hasLiked, toggleLike, isPending } = useLike(recipeId);

  const handleClick = () =>{
    toggleLike();
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleClick()}
        disabled={isPending}
        className={cn(
          "h-8 w-8",
          hasLiked && "text-red-500 hover:text-red-600 hover:bg-red-50"
        )}
      >
        <Heart
          className={cn(
            "h-4 w-4",
            hasLiked ? "fill-current":""
          )}
        />
      </Button>
      <span className="text-sm text-muted-foreground">{likesCount}</span>
    </div>
  );
} 