import { add, isBefore } from 'date-fns'
import jwt from 'jsonwebtoken'

export class RefreshToken {
	private decoded(token: string) {
		try {
			return jwt.verify(token, process.env.NEXTAUTH_SERCRET || 'suerpsercretkey') as {
				expiriesInDate: Date
			}
		} catch (error) {
			return null
		}
	}

	static generate() {
		const salt = process.env.NEXTAUTH_SERCRET || 'suerpsercretkey'
		const expiriesInDate = add(new Date(), { weeks: 25 })
		return jwt.sign({ expiriesInDate }, salt)
	}

	public changeActualToken(token: string): boolean {
		const data = this.decoded(token)
		if (!data) return false
		return isBefore(data.expiriesInDate, new Date())
	}
}
