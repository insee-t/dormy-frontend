import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     const user = { id: "1", name: "Test User", email: "test@example.com" }; // Replace with database query
    //     if (credentials?.email === user.email && credentials?.password === "password123") {
    //       return user;
    //     }
    //     return null;
    //   },
    // }),
  ],
  pages: {
    signIn: "../../sign-in/[[...index]].tsx",
  },
};

export default NextAuth(authOptions);
