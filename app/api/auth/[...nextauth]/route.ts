import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  
  providers: [
    CredentialsProvider({
      name: "Espace Admin",
      
      credentials: {
        username: { label: "Identifiant", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      
      async authorize(credentials, req) {
        const validUsername = process.env.ADMIN_USERNAME;
        const validPassword = process.env.ADMIN_PASSWORD;

        if (
          credentials?.username === validUsername &&
          credentials?.password === validPassword
        ) {
          return { id: "1", name: "Administrateur", email: "admin@site.com" };
        } else {
          return null; 
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
  },
});

export { handler as GET, handler as POST };