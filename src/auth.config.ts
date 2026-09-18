import type { NextAuthConfig } from "next-auth";

// Edge-safe config: no Prisma / bcrypt here so it can run in middleware.
// The Credentials provider itself is added in auth.ts (Node runtime only).
export default {
  // Auth.js only auto-trusts the request Host header on Vercel; every other
  // host (this app's target: local/self-hosted, per the SQLite setup) needs
  // this explicitly or every auth request is rejected as UntrustedHost.
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        return isLoggedIn;
      }

      if (isLoggedIn && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register")) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
