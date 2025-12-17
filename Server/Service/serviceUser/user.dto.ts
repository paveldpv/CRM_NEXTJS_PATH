import { DTO } from '../../classes/DTO'
import { TDBUser, TDBUserWithoutPas, TUserDTOWithoutPas } from './model/types/Types'

export class ServiceUserDTO extends DTO {
	static createUserDTO(data: TDBUserWithoutPas | TDBUser): TUserDTOWithoutPas {
		if ('password' in data) {
			const { password,phone, ...newData } = data

			return { ...newData, _id: this.objectIDToString(data._id) }
		}

		return { ...data, _id: this.objectIDToString(data._id) }
	}
	static createListUsersDTO(data: TDBUser[] | TDBUserWithoutPas[]): TUserDTOWithoutPas[] {
		return data.map((user) => this.createUserDTO(user))
	}


	
	static userWithoutProperty<K extends keyof TDBUserWithoutPas>(data: TDBUserWithoutPas, property: Array<K>) {
		return this.withoutProperty(data, property)
	}

	static userWithProperty<K extends keyof TDBUserWithoutPas>(data: TDBUserWithoutPas, property: Array<K>) {
		return this.withProperty(data, property)
	}
}
