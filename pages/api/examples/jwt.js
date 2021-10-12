// This is an example of how to read a JSON Web Token from an API route
import jwt from 'next-auth/jwt'
const jwtWebToken = require('jsonwebtoken');
const secret = process.env.SECRET

export default async (req, res) => {
  console.log('/api/jwt request', req)
  const token = await jwt.getToken({ req, secret })
  console.log("SECRET", secret)
  console.log("REQ", req)
  console.log("TOKEN", token)
  const jwtToken = jwtWebToken.sign(token.email, secret);
  res.send(JSON.stringify({jwtToken}))
}