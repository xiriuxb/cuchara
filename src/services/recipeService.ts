/* eslint-disable @typescript-eslint/no-explicit-any */
import { RecipeCreateEntity } from "@/entities/RecipeCreateEntity";
import axios, { AxiosError } from "axios";

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface Ingredient {
  _id: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface RecipeIngredient {
  _id: string;
  recipeId: string;
  ingredientId: string;
  quantity: number;
  unit: number;
  ingredient: Ingredient;
}

export interface Recipe {
  _id: string;
  name: string;
  description: string;
  url: string;
  createdAt: string;
  username: string;
  portions?: number;
  minutes?: number;
  dificulty?: number;
  process?: string;
  ingredients?: RecipeIngredient[];
  likesCount: number;
}

export interface RecipeResponse {
  data: Recipe[];
  nextCursor?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  nextCursor?: string;
}

export class RecipeService {
  private static readonly API_URL = process.env.NEXT_PUBLIC_API_URL;
  private static readonly api = axios.create({
    baseURL: this.API_URL,
  });

  static async createRecipe(
    recipe: RecipeCreateEntity,
    token: string
  ): Promise<Recipe> {
    try {
      const formData = new FormData();

      // Append basic fields with null checks
      if (recipe.name) formData.append("name", recipe.name);
      if (recipe.description)
        formData.append("description", recipe.description);
      if (recipe.portions)
        formData.append("portions", recipe.portions.toString());
      if (recipe.minutes) formData.append("minutes", recipe.minutes.toString());
      if (recipe.dificulty)
        formData.append("dificulty", recipe.dificulty.toString());
      if (recipe.process) formData.append("process", recipe.process);

      // Append ingredients as JSON string
      if (recipe.ingredients) {
        formData.append("ingredients", JSON.stringify(recipe.ingredients));
      }

      // Append image if exists
      if (recipe.image) {
        formData.append("image", recipe.image);
      }

      const { data } = await this.api.post<Recipe>("/recipes", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw {
          message: error.response?.data?.message || error.message,
          status: error.response?.status,
        } as ApiError;
      }
      throw {
        message: "An unexpected error occurred",
      } as ApiError;
    }
  }

  static async getMyRecipes(
    token: string,
    cursor?: string
  ): Promise<RecipeResponse> {
    try {
      const { data } = await this.api.get<RecipeResponse>("/recipes/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          cursor,
        },
      });

      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw {
          message: error.response?.data?.message || error.message,
          status: error.response?.status,
        } as ApiError;
      }
      throw {
        message: "An unexpected error occurred",
      } as ApiError;
    }
  }

  static async getRecipeById(id: string, token: string): Promise<Recipe> {
    try {
      const { data } = await this.api.get<Recipe>(`/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw {
          message: error.response?.data?.message || error.message,
          status: error.response?.status,
        } as ApiError;
      }
      throw {
        message: "An unexpected error occurred",
      } as ApiError;
    }
  }

  static async getUserRecipes(
    username: string,
    token: string,
    cursor?: string
  ): Promise<PaginatedResponse<Recipe>> {
    try {
      const { data } = await this.api.get<PaginatedResponse<Recipe>>(
        `/recipes/user/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { cursor },
        }
      );
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw {
          message: error.response?.data?.message || error.message,
          status: error.response?.status,
        } as ApiError;
      }
      throw {
        message: "An unexpected error occurred",
      } as ApiError;
    }
  }
}
