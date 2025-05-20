"use client";

import { useMyRecipes } from "@/hooks/useMyRecipes";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Link from "next/link";

export default function MyRecipes() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, error } = useMyRecipes();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) return <div>Cargando tus recetas...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className=" container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-[900px]">
      {data.pages.map((page) =>
        page.data.map((recipe) => (
          <RecipeCardComponent id={recipe._id} name={recipe.name} url={recipe.url} />
        ))
      )}
      <div ref={ref} className="h-10 flex items-center justify-center">
        {isFetchingNextPage && <div>Cargando más recetas...</div>}
      </div>
    </section>
  );
} 

const RecipeCardComponent = ({ url, name, id }:{url:string, name:string, id:string}) => {
  return (
    <Link
      className="mx-auto relative min-h-auto min-w-36"
      href={`/recipe/${id}`}
    >
      <div className="absolute w-full h-full rounded-xl hover:bg-slate-900/25 hover:bg-opacity-35"></div>
      <img
        className="aspect-square w-full object-cover rounded-xl hover:"
        src={url}
        alt={name}
      />
      <p className="text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] w-full py-3 px-2 bg-opacity-25 absolute top-0 rounded-t-xl bg-slate-900 text-ellipsis text-nowrap overflow-x-hidden">
        {name}
      </p>
    </Link>
  );
};


