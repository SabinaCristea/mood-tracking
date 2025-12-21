"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <SignedOut>
        <RedirectTo path="/sign-in" />
      </SignedOut>

      <SignedIn>
        <RedirectTo path="/home" />
      </SignedIn>
    </>
  );
}

// Reusable redirect component
function RedirectTo({ path }: { path: string }) {
  const router = useRouter();

  useEffect(() => {
    router.push(path);
  }, [router, path]);

  return null;
}
