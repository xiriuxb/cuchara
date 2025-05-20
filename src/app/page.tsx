"use client";

import RecipeCardInfo from "@/components/feed/RecipeCardInfo";
import { useFeed } from "@/hooks/useFeed";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function Home() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, error } = useFeed();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) return <div>Cargando recetas...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="pt-4 justify-items-center px-3">
      {data.pages.map((page) =>
        page.data.map((recipe) => (
          <RecipeCardInfo
            key={recipe._id}
            recipeInfo={{
              id: recipe._id,
              name: recipe.name,
              primary_image: recipe.url,
              user: {
                id: recipe._id,
                user_name: recipe.username,
              },
              description: recipe.description,
              created_at: recipe.createdAt,
            }}
          />
        ))
      )}
      <div ref={ref} className="h-10 flex items-center justify-center">
        {isFetchingNextPage && <div>Cargando más recetas...</div>}
      </div>
    </section>
  );
}
