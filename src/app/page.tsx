"use client";

import RecipeCardInfo from "@/components/feed/RecipeCardInfo";
import { RecipeInfo } from "@/entities/RecipeInfoEntity";

const recipe: RecipeInfo ={
  id:'aaaa',
  name:'Receta 1',
  primary_image: 'https://res.cloudinary.com/drofinqgp/image/upload/v1709856741/recipes/ts1c9xg3oe67jta1oe0d.jpg',
  user: {
    id: '1',
    user_name: 'Jorge Trujillo'
  },
  description: 'Lorem ipsum door',
  created_at: new Date().toISOString(),
}

export default function Home() {
  return (
    <RecipeCardInfo recipeInfo={recipe} />
  );
}
