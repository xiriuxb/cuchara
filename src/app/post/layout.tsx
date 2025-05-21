import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";

export default function PostLayout({
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
        <div className="container mx-auto py-10 max-w-2xl">
          <h2 className="text-2xl font-bold mb-6">Nueva Receta</h2>
        {children}
        </div>
      </SignedIn>
    </>
  );
}
