import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Routes that authenticated users should NOT see (Sign In / Sign Up)
const isAuthRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);
// Onboarding route
const isOnboardingRoute = createRouteMatcher(["/onboarding(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  // 1. If user is signed in and tries to access sign-in or sign-up
  if (userId && isAuthRoute(req)) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // 2. If user is signed in, check onboarding status
  if (userId) {
    const onboardingComplete = sessionClaims?.metadata?.onboardingCompleted;

    // If they try to go to onboarding but are already done -> send to home
    if (isOnboardingRoute(req) && onboardingComplete) {
      return NextResponse.redirect(new URL("/home", req.url));
    }

    // Optional: If they try to go home but haven't onboarded -> send to onboarding
    // if (!isOnboardingRoute(req) && !onboardingComplete && req.nextUrl.pathname !== "/api/clerk-webhook") {
    //   return NextResponse.redirect(new URL("/onboarding", req.url));
    // }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
