import axios, { AxiosError } from "axios";

export interface ApiError {
  message: string;
  status?: number;
}

export interface FollowResponse {
  followed: boolean;
}

export class FollowService {
  private static readonly API_URL = process.env.NEXT_PUBLIC_API_URL;
  private static readonly api = axios.create({
    baseURL: this.API_URL,
  });

  static async followUser(followingId: string, token: string): Promise<FollowResponse> {
    try {
      const response = await this.api.post<FollowResponse>('/follows', 
        { followingId },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      return response.data;
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

  static async isFollowing(targetId: string, token: string): Promise<FollowResponse> {
    try {
      const response = await this.api.get<FollowResponse>(`/follows/is-following/${targetId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
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