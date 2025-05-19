import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";

export default function TopBarComponent() {
  return (
    <nav className="sticky top-0 flex justify-between border-b px-2 sm:px-11 py-2 min-h-14 bg-sidebar z-100">
      <div className="flex items-center gap-3">
        <Search />
        <input type="text" className="border h-full px-3"></input>
      </div>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </nav>
  );
}
