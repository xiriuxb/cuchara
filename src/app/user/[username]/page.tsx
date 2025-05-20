"use client";

import { useUserData } from "@/hooks/useUserData";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { use } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ProfileSkeleton } from "@/components/profile/ProfileSkeleton";
import { useUser } from "@clerk/nextjs";
import UserRecipes from "@/components/recipe/UserRecipes";
import { FollowButton } from "@/components/profile/FollowButton";

interface UserPageProps {
    params: Promise<{
        username: string;
    }>;
}

export default function UserPage({ params }: UserPageProps) {
    const { username } = use(params);
    const { data, isPending, error, isError } = useUserData(username);
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user?.username === username) {
            router.replace("/profile");
        }
    }, [user?.username, username, router]);

    if (isPending) {
        return <ProfileSkeleton />;
    }

    if (isError || !data) {
        return (
            <div className="container mx-auto max-w-4xl px-4 py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h2 className="text-red-800 font-semibold mb-2">
                        Error al cargar el perfil
                    </h2>
                    <p className="text-red-600">
                        {error?.message ||
                            "No se pudo cargar el perfil del usuario"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <section className="container mx-auto py-2 max-w-4xl">
            <div className="bg-muted p-4 rounded-lg overflow-auto flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row sm:gap-4 place-items-center sm:place-items-start">
                    <Avatar className="size-20">
                        <AvatarImage src={data.imageUrl} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <section className="flex flex-col justify-between py-3">
                        <span className="font-bold">{`@${data.username}`}</span>
                        {data.firstName && data.lastName && (
                            <h2>{`${data.firstName} ${data.lastName}`}</h2>
                        )}
                    </section>
                    <section className="flex-1 grid gap-2 justify-items-center sm:justify-items-end">
                        {user?.username !== username && (
                            <FollowButton targetId={data._id} />
                        )}
                        <div className="flex gap-4">
                            <span>{`${data.followersCount} follower(s)`}</span>
                            <span>{`${data.followingCount} follow(s)`}</span>
                            <span>{`${data.recipesCount} recipe(s)`}</span>
                        </div>
                    </section>
                </div>
                <p>{data.bio}</p>
                <div className="text-sm text-gray-500">
                    <p>
                        Miembro desde:{" "}
                        {new Date(data.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
            <UserRecipes username={username} />
        </section>
    );
}
