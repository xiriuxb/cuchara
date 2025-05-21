"use client";

import { useRecipe } from "@/hooks/useRecipe";
import Image from "next/image";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { RecipeInteractions } from "./RecipeInteractions";

interface RecipeViewProps {
  id: string;
}

const getUnitLabel = (unit: number): string => {
  switch (unit) {
    case 1:
      return "g";
    case 2:
      return "ml";
    case 3:
      return "unidad";
    case 4:
      return "cucharada";
    case 5:
      return "cucharadita";
    default:
      return "";
  }
};

export default function RecipeView({ id }: RecipeViewProps) {
  const { data, isPending, error, isError } = useRecipe(id);

  if (isPending) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="animate-pulse">
          <div className="h-[400px] bg-gray-200 rounded-lg mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-semibold mb-2">Error al cargar la receta</h2>
          <p className="text-red-600">{error?.message || "No se pudo cargar la receta"}</p>
        </div>
      </div>
    );
  }

  const recipe = data;

  return (
    <article className="container mx-auto max-w-4xl px-4 py-8">
      <div className="relative w-full h-[400px] mb-6">
        <Image
          src={recipe.url}
          alt={recipe.name}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">{recipe.name}</h1>
        <RecipeInteractions recipeId={id} likesCount={recipe.likesCount || 0} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {recipe.portions && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold">Porciones</h3>
            <p>{recipe.portions}</p>
          </div>
        )}
        {recipe.minutes && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold">Tiempo</h3>
            <p>{recipe.minutes} minutos</p>
          </div>
        )}
        {recipe.dificulty && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold">Dificultad</h3>
            <p>{recipe.dificulty}/5</p>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Descripción</h2>
        <p className="text-gray-700">{recipe.description}</p>
      </div>

      {recipe.ingredients && recipe.ingredients.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Ingredientes</h2>
          <ul className="list-disc list-inside">
            {recipe.ingredients.map((item) => (
              <li key={item._id} className="text-gray-700">
                {item.quantity} {getUnitLabel(item.unit)} de {item.ingredient.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {recipe.process && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Proceso</h2>
          <p className="text-gray-700 whitespace-pre-line">{recipe.process}</p>
        </div>
      )}

      <div className="text-sm text-gray-500 mb-8">
        <p>Creado por: {recipe.username}</p>
        <p>Fecha: {new Date(recipe.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Comentarios</h2>
        <div className="space-y-8">
          <CommentForm recipeId={id} />
          <CommentList recipeId={id} />
        </div>
      </div>
    </article>
  );
} 