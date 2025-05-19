'use client'

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
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
  requireAuth = true,
}: ConditionalLinkProps) {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (requireAuth && !isSignedIn) {
      e.preventDefault();
      router.push("/sign-in");
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
