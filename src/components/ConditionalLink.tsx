'use client'

import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

type ConditionalLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  requireAuth?: boolean;
};

export function ConditionalLink({
  href,
  children,
  className,
}: ConditionalLinkProps) {

  return (
    <>
    <SignedIn>
      <Link href={href} className={className}>
        {children}
      </Link>
    </SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
    </>
  );
}
