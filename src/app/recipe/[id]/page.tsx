"use client";

import RecipeView from "@/components/recipe/RecipeView";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { use } from "react";

interface RecipePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function RecipePage({ params }: RecipePageProps) {
  const { id } = use(params);
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <RecipeView id={id} />
      </SignedIn>
    </>
  );
} 