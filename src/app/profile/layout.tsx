import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn></RedirectToSignIn>
      </SignedOut>
      <SignedIn>
        <div className="container mx-auto py-10 max-w-4xl">{children}</div>
      </SignedIn>
    </>
  );
}
