"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  return (
    <>
      <Authenticated>
        <RedirectTo path="/home" />
      </Authenticated>

      <Unauthenticated>
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
