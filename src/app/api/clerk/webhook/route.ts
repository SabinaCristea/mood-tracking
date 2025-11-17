// import { Webhook } from "svix";
// import { headers } from "next/headers";
// import { ConvexHttpClient } from "convex/server";
// import { api } from "@/convex/_generated/api";

// const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// export async function POST(req: Request) {
//   const payload = await req.text();
//   const headerList = headers();

//   // Verify Clerk webhook
//   const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
//   const event = wh.verify(payload, {
//     "svix-id": headerList.get("svix-id")!,
//     "svix-timestamp": headerList.get("svix-timestamp")!,
//     "svix-signature": headerList.get("svix-signature")!,
//   });

//   const clerkUser = event.data;

//   await convex.action(api.users.syncClerkUser, clerkUser);

//   return new Response("ok");
// }
