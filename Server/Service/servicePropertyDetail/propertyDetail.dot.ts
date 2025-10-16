import { DTO } from '../../classes/DTO'
import { TPropertyDetail, TPropertyDetailDTO } from './model/types/Types'

export class PropertyDetailDTO extends DTO {
	static createPropertyDetailDTO(data:TPropertyDetail):TPropertyDetailDTO{
		return {...data,_id:this.objectIDToString(data._id)}
	}
}