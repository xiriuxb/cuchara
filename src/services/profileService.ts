import axios, { AxiosError } from "axios";

// TODO: Replace 'any' with the correct user profile type when available
export interface UserProfile {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  bio?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

export class ProfileService {
  private static readonly API_URL = process.env.NEXT_PUBLIC_API_URL;
  private static readonly api = axios.create({
    baseURL: this.API_URL,
  });

  static async getProfile(token: string): Promise<UserProfile> {
    try {
      const { data } = await this.api.get<UserProfile>('/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
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

  static async updateProfile(token: string, bio: string): Promise<{bio:string}> {
    try {
      const { data } = await this.api.patch<{bio:string}>('/user/bio', { bio }, {
        headers: {
          'Authorization': `Bearer ${token}`,
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