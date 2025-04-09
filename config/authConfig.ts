
import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { ServiceAuth } from '../Server/Service/serviceAuth/serviceAuth'
import { TDBUser, TFormLogin } from '@/shared/model/types/Types'

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
				return {
					...token,
					dataUser: JSON.parse(JSON.stringify(user)),
					// dataUser:{...user._doc}
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
}

export default authConfig
