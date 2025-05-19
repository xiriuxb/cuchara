"use client";

import RecipeCardInfo from "@/components/feed/RecipeCardInfo";
import { RecipeInfo } from "@/entities/RecipeInfoEntity";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

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
  const { getToken } = useAuth();
  async function sendProtectedRequest() {
    const token = await getToken();
  
    const response = await fetch('http://localhost:3000/auth/test', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  
    const data = await response.json();
    console.log(data);
  }
  
  useEffect(()=>{
  sendProtectedRequest();
  },[])
  return (
    <section className="pt-4 justify-items-center px-3">
      <RecipeCardInfo recipeInfo={recipe} />
      <RecipeCardInfo recipeInfo={recipe} />
      <RecipeCardInfo recipeInfo={recipe} />
      <RecipeCardInfo recipeInfo={recipe} />
      <RecipeCardInfo recipeInfo={recipe} />
      <RecipeCardInfo recipeInfo={recipe} />
    </section>
  );
}
