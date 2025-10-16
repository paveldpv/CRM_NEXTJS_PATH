import { DTO } from '../../classes/DTO'
import { ServiceUserDTO } from '../serviceUser/user.dto'
import { TGeolLocationDTO, TGeolLocationFullInfo, TGeolLocationFullInfoDTO, TGeoLocation } from './model/types/type'

export class ServiceGeoLocationDTO extends DTO {
	static createGeoLocationDTO(data: TGeoLocation): TGeolLocationDTO {
		return { ...data, _id: this.objectIDToString(data._id), user: this.objectIDToString(data.user) }
	}
	static createListGeoLocation(data: TGeoLocation[]): TGeolLocationDTO[] {
		return data.map((el) => this.createGeoLocationDTO(el))
	}
}

export class ServiceGeoLocationFullInfoDTO extends DTO {
	static createGeoLocationFullInfo(data: TGeolLocationFullInfo): TGeolLocationFullInfoDTO {
		return {
			...data,
			_id: this.objectIDToString(data._id),
			user: ServiceUserDTO.createUserDTO(data.user),
		}
	}
	
	static createListGeoLocationFullInfoDTO(data: TGeolLocationFullInfo[]): TGeolLocationFullInfoDTO[]{
		return data.map(el=>this.createGeoLocationFullInfo(el))
	}
}
