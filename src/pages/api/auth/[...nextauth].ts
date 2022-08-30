import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    })
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          provider: account.provider
        }
      }

      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      return {
        ...session,
        accessToken: token.accessToken,
        provider: token.provider
      }
    }
  }
})
