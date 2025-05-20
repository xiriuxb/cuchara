import axios, { AxiosError } from "axios";

export interface FeedRecipe {
  _id: string;
  name: string;
  description: string;
  url: string;
  createdAt: string;
  username: string;
}

export interface FeedResponse {
  data: FeedRecipe[];
  nextCursor?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

export class FeedService {
  private static readonly API_URL = process.env.NEXT_PUBLIC_API_URL;
  private static readonly api = axios.create({
    baseURL: this.API_URL,
  });

  static async getFeed(cursor?: string): Promise<FeedResponse> {
    try {
      const { data } = await this.api.get<FeedResponse>('/feed', {
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
        message: 'An unexpected error occurred',
      } as ApiError;
    }
  }
} 