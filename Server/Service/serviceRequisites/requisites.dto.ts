import { DTO } from '../../classes/DTO'
import { TRequisites, TRequisitesDTO } from './model/types/Type'

export class RequisitesDTO extends DTO {
	static CreateRequisitesDTO(data:TRequisites):TRequisitesDTO{
		return {...data,_id:this.objectIDToString(data._id)}
	}
	static createListRequisitesDTO(data:TRequisites[]):TRequisitesDTO[]{
		return data.map(el=>this.CreateRequisitesDTO(el))
	}
}
