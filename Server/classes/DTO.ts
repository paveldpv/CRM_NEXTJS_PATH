import { Types } from 'mongoose'

export class DTO {
	constructor() {}

	protected static objectIDToString(_id: Types.ObjectId): string {
		return _id.toString()
	}

	protected static withProperty<T, K extends keyof T>(data: T, property: Array<K>) {
		let result: Record<K, T[K]> = {} as Record<K, T[K]>
		property.forEach((prop) => {
			result[prop] = data[prop]
		})

		return result
	}

	protected static withoutProperty<T, K extends keyof T>(data: T, property: Array<K>): Omit<T, K> {
		let result = { ...data }

		property.forEach((prop) => {
			delete result[prop]
		})

		return result
	}
}
