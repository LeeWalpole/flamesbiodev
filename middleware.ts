import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextRequest } from "next/server";

export default authMiddleware({
  afterAuth: (auth, req: NextRequest) => {
    if (!auth.userId && !auth.isPublicRoute && req.nextUrl.pathname !== "/") {
      const returnBackUrl = new URL(
        req.url,
        process.env.NEXT_PUBLIC_SITE_URL
      ).toString();
      return redirectToSignIn({ returnBackUrl });
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\.).*)", "/dashboard(.*)", "/profile(.*)"],
};
