import { API_URL } from "@/config/constants";
import axios from "axios";

export class LikeService {
  static async toggleLike(
    recipeId: string,
    token: string
  ): Promise<{ liked: boolean }> {
    try {
      const response = await axios.post(
        `${API_URL}/likes/${recipeId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async hasUserLiked(
    recipeId: string,
    token: string
  ): Promise<{ liked: boolean }> {
    try {
      const response = await axios.get(`${API_URL}/likes/${recipeId}/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
