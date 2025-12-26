import * as CryptoJS from 'crypto-js'




export default class EncryptionService {
	private key: string
	
	constructor() {
		this.key = process.env.SECRET_KEY || 'suerpsercretkey'
		
	}

	private crypto<T>(data: T): T {
		if (typeof data === 'string') {
			return CryptoJS.AES.encrypt(data, this.key).toString() as unknown as T // тут ошибка типа
		} else if (Array.isArray(data)) {
			return data.map((el) => {
				//и тут ошибка типа
				if (typeof el === 'string') {
					return CryptoJS.AES.encrypt(el, this.key).toString()
				} else {
					return el
				}
			}) as unknown as T
		} else {
			return data
		}
	}

	private deCrypto<T>(data: T): T {
		if (typeof data === 'string') {
			return CryptoJS.AES.decrypt(data, this.key).toString() as unknown as T
		} else if (Array.isArray(data)) {
			return data.map((el) => {
				if (typeof el === 'string') {
					return CryptoJS.AES.decrypt(el, this.key).toString()
				} else {
					return el
				}
			}) as unknown as T
		} else {
			return data
		}
	}

	public encrypt(data: string): string
	public encrypt<T extends Object, K extends keyof T>(data: T, keys: K[]): T
	public encrypt<T extends Object | string, K extends keyof T>(data: T, keys?: K[]): unknown {
		if (typeof data === 'string') {
			return this.crypto(data)
		}
		if (typeof data === 'object' && data !== null && Array.isArray(keys)) {
			let result = { ...data }
			keys.forEach((key) => {
				if (key in result) {
					const value = result[key]
					result[key] = this.crypto(value)
				}
			})
			return result
		}
	}



	public deEncrypt(data: string): string
	public deEncrypt<T extends Object, K extends keyof T>(data: T, keys: K[]): T
	public deEncrypt<T extends Object | string, K extends keyof T>(data: T, keys?: K[]): unknown {
		if (typeof data === 'string') {
			return this.deCrypto(data)
		}
		if (typeof data === 'object' && data !== null && Array.isArray(keys)) {
			let result = { ...data }
			keys.forEach((key) => {
				if (key in result) {
					const value = result[key]
					result[key] = this.deCrypto(value)
				}
			})
			return result
		}
	}
}


