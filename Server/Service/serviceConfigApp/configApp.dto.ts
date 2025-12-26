import { DTO } from '../../classes/DTO'
import { TConfigAPP, TConfigAPP_DTO } from './model/types/Type'

export class ConfigAppDTO extends DTO {
	static createConfigAppDTO(data: TConfigAPP): TConfigAPP_DTO {
		return { ...data, idUser: this.objectIDToString(data.idUser), _id: this.objectIDToString(data._id) }
	}
}
