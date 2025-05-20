"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Edit, Check, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import MyRecipes from "@/components/profile/MyRecipes";

export default function ProfilePage() {
  const { data: profile, isPending, error, updateProfile } = useProfile();

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        {isPending && <div>Cargando perfil...</div>}
        {error && <div>Error: {error.message}</div>}
        {profile && (
          <section className="container mx-auto py-2 max-w-4xl">
            <div className="bg-muted p-4 rounded-lg overflow-auto flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row sm:gap-4 place-items-center sm:place-items-start">
                <Avatar className="size-20">
                  <AvatarImage src={profile.imageUrl!} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <section className="flex flex-col justify-between py-3">
                  <span className="font-bold">{`@${profile.username}`}</span>
                  <h2>{`${profile.firstName} ${profile.lastName}`}</h2>
                </section>
                <section className="flex-1 grid gap-2  justify-items-center sm:justify-items-end">
                  <Button>Follow</Button>
                  <div className="flex gap-4">
                    <span>0 follower(s)</span>
                    <span>0 follow(s)</span>
                    <span>0 recipe(s)</span>
                  </div>
                </section>
              </div>
              <ProfileBioEditor
                bio={profile.bio}
                updateProfile={updateProfile}
                isPending={updateProfile.isPending}
              />
            </div>
          </section>
        )}
        <MyRecipes/>
      </SignedIn>
    </>
  );
}

function ProfileBioEditor({
  bio: initialBio,
  updateProfile,
  isPending,
}: {
  bio?: string;
  updateProfile: {
    mutateAsync: (bio: string) => Promise<{bio:string}>;
    isPending: boolean;
  };
  isPending: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(initialBio || "");

  const handleEdit = () => {
    setBio(initialBio || "");
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!bio.trim()) {
      setIsEditing(false);
      return;
    }
    try {
      await updateProfile.mutateAsync(bio);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setBio(initialBio || "");
  };

  return (
    <section className="flex items-center gap-2 flex-1">
      {!isEditing ? (
        <>
          <Button variant="ghost" size="icon" onClick={handleEdit}>
            <Edit className="h-4 w-4" />
          </Button>
          <span>{initialBio || "No bio yet"}</span>
        </>
      ) : (
        <>
          <div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
              disabled={isPending}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancel}
              disabled={isPending}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Input
            value={bio}
            onChange={(e) => {
              if (e.target.value.length <= 300) setBio(e.target.value);
            }}
            placeholder="Write your bio..."
            className="flex-1"
            maxLength={300}
          />
          <span className="text-xs text-muted-foreground ml-2">
            {bio.length}/300
          </span>
        </>
      )}
    </section>
  );
}
