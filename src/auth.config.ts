import type { NextAuthConfig } from "next-auth";

// Edge-safe config: no Prisma / bcrypt here so it can run in middleware.
// The Credentials provider itself is added in auth.ts (Node runtime only).
export default {
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
