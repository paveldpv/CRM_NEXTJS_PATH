import { DTO } from '../../classes/DTO'
import { TDaDataOrganization, TDaDataOrganizationDTO } from './model/types/Type'

export class serviceDaDataOrganizationDTO extends DTO {
	static createDaDataOrganizationDTO(data:TDaDataOrganization):TDaDataOrganizationDTO{
		return  {...data,_id:this.objectIDToString(data._id)}
	}
	static createListDaDataOrganization(data:TDaDataOrganization[]):TDaDataOrganizationDTO[]{
		return data.map(el=>this.createDaDataOrganizationDTO(el))
	}
}