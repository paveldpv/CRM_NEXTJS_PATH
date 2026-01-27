import { TFormLogin } from '@/shared/model/types/subtypes/Types'
import type { AuthOptions } from 'next-auth'

import { TUserDTOWithoutPas } from '@/shared/model/types'
import CredentialsProvider from 'next-auth/providers/credentials'
import { ServiceAuth } from '../Server/Service/serviceAuth/serviceAuth'
import { TTokens } from '../Server/Service/serviceSession/model/types/Type'

declare module 'next-auth' {
	interface Session {
		jwt: string // Позволяет session.jwt
		refreshToken: string
		user:TUserDTOWithoutPas
		dataSessionUser?: any // Если используется
	}
}

declare module 'next-auth' {
	interface User {
		dataUser: TUserDTOWithoutPas
		token: TTokens
	}

	interface AdapterUser {
		dataUser: TUserDTOWithoutPas
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
			session.user = token.dataUser as TUserDTOWithoutPas

			return { ...session }
		},

		async jwt({ token, user, account, profile }) {
			if (user) {
				return {
      ...token, // сперва token
      jwt: user.token.jwt,
      refreshToken: user.token.refreshToken,
      dataUser: user.dataUser // ← отдельным полем
    }
				// token.jwt = user.token.jwt
				// token.refreshToken = user.token.refreshToken
				// user.dataUser = user.dataUser as TUserDTOWithoutPas
				// return {
				// 	...token,
				// 	...user,
				// }
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
