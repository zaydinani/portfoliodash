import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // Get the pathname from the request URL
      const { pathname } = req.nextUrl;

      // Allow access to the sign-in page and public assets
      if (pathname === "/" || pathname.startsWith("/LOGO3.png")) {
        return true;
      }

      // Protect all other routes
      return !!token;
    },
  },
  pages: {
    signIn: "/", // Specify the sign-in page URL
  },
});
