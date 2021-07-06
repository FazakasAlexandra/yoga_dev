import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      console.log(user, account, profile)
      return true
    },
    async redirect(url, baseUrl) {
      console.log(url, baseUrl)
      return baseUrl
    },
    async session(session, user) {
      console.log(session, user)
      return session
    },
    async jwt(token, user, account, profile, isNewUser) {
      console.log(token, user, account, profile, isNewUser)
      return token
    }
  },
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  debug: true,
})
