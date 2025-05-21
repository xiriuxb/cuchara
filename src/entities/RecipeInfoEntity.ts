export interface RecipeInfo {
  id: string;
  name: string;
  created_at: string;
  primary_image: string;
  description?: string;
  user: RecipeUser;
  likesCount: number;
}

interface RecipeUser {
  user_name: string;
  id: string;
}