"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const obj = useAuth();
  const { userId, signOut } = useAuth();
  const router = useRouter();

  console.log(obj);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Welcome {userId ? `User ${userId}` : "Guest"}
      </h1>
      <button
        onClick={() => {
          signOut();
          router.push("/sign-in");
        }}
      >
        Log out
      </button>
    </div>
  );
}
