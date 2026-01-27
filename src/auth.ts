// /auth.ts (на одном уровне с package.json)
import NextAuth from "next-auth"
import authConfig from '../config/authConfig'


export const { 
  auth, 
  handlers, 
  signIn, 
  signOut 
} = NextAuth(authConfig)

// Экспортируем для удобства
export default NextAuth(authConfig)