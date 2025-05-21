"use client";

import { LikeButton } from "./LikeButton";

interface RecipeInteractionsProps {
  recipeId: string;
  likesCount: number;
}

export function RecipeInteractions({ recipeId, likesCount }: RecipeInteractionsProps) {
  return (
    <div className="flex items-center gap-4">
      <LikeButton recipeId={recipeId} likesCount={likesCount} />
    </div>
  );
} 