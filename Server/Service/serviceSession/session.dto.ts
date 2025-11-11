import { DTO } from '../../classes/DTO'
import { ServiceUserDTO } from '../serviceUser/user.dto'
import { TSession, TSessionDTO, TSessionFullInfo, TSessionFullInfoDTO } from './model/types/Type'

export class SessionDTO extends DTO {
	static createSessionDTO(data: TSession): TSessionDTO {
		return { ...data, _id: this.objectIDToString(data._id), user: this.objectIDToString(data.user) }
	}
	static createListSessionDTO(data: TSession[]): TSessionDTO[] {
		return data.map((session) => this.createSessionDTO(session))
	}
}

export class SessionFullInfoDTO extends DTO {
	static createSessionFullInfoDTO(data: TSessionFullInfo): TSessionFullInfoDTO {
		const userDTO = ServiceUserDTO.createUserDTO(data.user)
		return { ...data, _id: this.objectIDToString(data._id), user: userDTO }
	}
	static createListSessionFullInfoDTO(data: TSessionFullInfo[]): TSessionFullInfoDTO[] {
		return data.map(session=>this.createSessionFullInfoDTO(session))
	}
}
