import axios, { AxiosError } from "axios";

export interface UserData {
    _id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    imageUrl: string;
    bio?: string;
    createdAt: string;
    followersCount: number;
    followingCount: number;
    recipesCount: number;
}

export interface ApiError {
    message: string;
    status?: number;
}

export class UserService {
    private static readonly API_URL = process.env.NEXT_PUBLIC_API_URL;
    private static readonly api = axios.create({
        baseURL: this.API_URL,
    });

    static async getUserData(
        username: string,
        token: string
    ): Promise<UserData> {
        try {
            const { data } = await this.api.get<UserData>(`/user/${username}`, {
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
}
