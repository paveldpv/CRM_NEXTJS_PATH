import {  TFormLogin } from '@/shared/model/types/Types'
import { add } from 'date-fns'
import { ObjectId } from 'mongoose'
import type { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { ServiceAuth } from '../Server/Service/serviceAuth/serviceAuth'
import { TDBUser } from '../Server/Service/serviceUser/model/types/Types'

declare module 'next-auth' {
	interface User {
		_id: ObjectId
	}

	interface AdapterUser {
		_id: ObjectId
	}
}

const authConfig: AuthOptions = {
	secret: process.env.NEXTAUTH_SERCRET,
	pages: {
		signIn: '/sign',
	},
	callbacks: {
		async session({ session, token, user }) {
			const dataSessionUser = token as TDBUser

			return { ...session, dataSessionUser }
		},

		async jwt({ token, user, account, profile }) {
			if (user) {
				token._id = user._id
				token.exp = add(new Date(), { weeks: 3 }) 
				return {
					...token,
					//dataUser: JSON.parse(JSON.stringify(user)),
				}
			}

			return token
		},
	},

	providers: [
		CredentialsProvider({
			name: 'Credatials',
			credentials: {
				phone: { label: 'Phone', type: 'text', placeholder: 'jsmith' },
				password: { label: 'Password', type: 'password' },
				INN: { label: 'Phone', type: 'number', placeholder: 'jsmith' },
			},
			async authorize(credentials, req) {
				const serviceAuth = new ServiceAuth(credentials as TFormLogin)
				const resultAuth = await serviceAuth.auth()

				if (resultAuth) return resultAuth as any
				return null
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
}

export default authConfig
