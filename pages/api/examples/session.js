// This is an example of how to access a session from an API route
import { getSession } from 'next-auth/client'
const jwtWebToken = require('jsonwebtoken');
const secret = process.env.SECRET

export default async (req, res) => {
  const session = await getSession({ req })
  const jwtToken = jwtWebToken.sign(session.user.email, secret);
  session.jwt = jwtToken

  res.send(JSON.stringify(session, null, 2))
}