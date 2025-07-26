"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default function Page() {
  const router = useRouter();

  return (
    <>
      <Authenticated>
        {/* Redirect to /home or show homepage directly */}
        <RedirectTo path="/home" />
      </Authenticated>

      <Unauthenticated>
        {/* Redirect to /login if not signed in */}
        <RedirectTo path="/login" />
      </Unauthenticated>
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
