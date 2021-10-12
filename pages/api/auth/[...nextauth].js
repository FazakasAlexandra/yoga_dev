import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.PROD_GOOGLE_ID,
      clientSecret: process.env.PROD_GOOGLE_SECRET,
    }),
  ],
  secret: process.env.GOOGLE_SECRET,
  session: {
    jwt: true,
  },
  debug: true,
})
