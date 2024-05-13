import Admin from "../../../../models/admin";
import credentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const options = {
  providers: [
    credentialsProvider({
      name: "credentials",
      credentials: {
        name: {
          label: "name",
          type: "text",
          placeholder: "name",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        try {
          const foundAdmin = await Admin.findOne({ name: credentials.name })
            .lean()
            .exec();
          if (foundAdmin) {
            console.log("admin found");
            const match = await bcrypt.compare(
              credentials.password,
              foundAdmin.password
            );

            if (match) {
              console.log("good pass");
              console.log(foundAdmin);
              delete foundAdmin.password;
              foundAdmin.role = "admin";
              console.log("role is :", foundAdmin.role);
              return foundAdmin;
            }
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      console.log("session is", session);
      console.log("session role", session.user.role);
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};
