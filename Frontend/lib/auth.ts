import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [], // Add authentication providers here (e.g., Google, GitHub)
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as "learner" | "mentor"
      }
      return session
    },
  },
}
