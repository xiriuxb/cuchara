import { API_URL } from "@/config/constants";

interface CommentAuthor {
  _id: string;
  username: string;
  imageUrl: string;
}

export interface Comment {
  _id: string;
  recipe: string;
  author: CommentAuthor;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export class CommentService {
  static async getComments(recipeId: string, token: string): Promise<Comment[]> {
    const response = await fetch(`${API_URL}/comments/${recipeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al cargar los comentarios");
    }

    return response.json();
  }

  static async createComment(recipeId: string, content: string, token: string): Promise<Comment> {
    const response = await fetch(`${API_URL}/comments/${recipeId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al crear el comentario");
    }

    return response.json();
  }
} 