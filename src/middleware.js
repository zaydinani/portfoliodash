import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // Get the pathname from the request URL
      const { pathname } = req.nextUrl;

      // Allow access to the sign-in page and public assets
      if (pathname === "/" || pathname.startsWith("/LOGO3.png")) {
        //console.log("User is not authenticated, redirecting to sign in");
        return true; // Allow access
      }

      // Protect all other routes
      return !!token; // Allow access to protected routes only if authenticated
    },
  },
  pages: {
    signIn: "/", // Specify the sign-in page URL
  },
});
