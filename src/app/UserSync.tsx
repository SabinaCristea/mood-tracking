"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export function UserSync() {
  const { user, isLoaded } = useUser();
  const syncUser = useMutation(api.users.users.syncClerkUser);

  useEffect(() => {
    if (!isLoaded || !user) return;

    syncUser({
      clerkId: user.id,
      email: user.primaryEmailAddress?.emailAddress ?? "",
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      imageUrl: user.imageUrl ?? "",
    });
  }, [isLoaded, user, syncUser]);

  return null;
}
