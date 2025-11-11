import { TFormLogin } from '@/shared/model/types/subtypes/Types'
import type { AuthOptions } from 'next-auth'

import CredentialsProvider from 'next-auth/providers/credentials'
import { ServiceAuth } from '../Server/Service/serviceAuth/serviceAuth'
import { TTokens } from '../Server/Service/serviceSession/model/types/Type'
import { TDBUserWithoutPas } from '../Server/Service/serviceUser/model/types/Types'

declare module 'next-auth' {
	interface Session {
		jwt: string // Позволяет session.jwt
		refreshToken: string
		dataSessionUser?: any // Если используется
	}
}

declare module 'next-auth' {
	interface User {
		dataUser: TDBUserWithoutPas
		token: TTokens
	}

	interface AdapterUser {
		dataUser: TDBUserWithoutPas
		token: TTokens
	}
}

const authConfig: AuthOptions = {
	secret: process.env.NEXTAUTH_SERCRET,
	pages: {
		signIn: '/sign',
	},
	callbacks: {
		async session({ session, token, user }) {
			session.jwt = token.jwt as string
			session.refreshToken = token.refreshToken as string
			session.user = token.dataUser as TDBUserWithoutPas

			return { ...session }
		},

		async jwt({ token, user, account, profile }) {
			if (user) {
				token.jwt = user.token.jwt
				token.refreshToken = user.token.refreshToken
				user.dataUser = user.dataUser as TDBUserWithoutPas
				return {
					...token,
					...user,
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

				if (resultAuth?.dataUser) return resultAuth as any
				return null
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
}

export default authConfig
