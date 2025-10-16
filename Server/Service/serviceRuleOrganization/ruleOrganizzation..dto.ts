import { DTO } from '../../classes/DTO'
import { RequisitesDTO } from '../serviceRequisites/requisites.dto'
import {
	TDataOrganization,
	TDataOrganizationDTO,
	TDataOrganizationFullInfo,
	TDataOrganizationFullInfoDTO,
} from './model/types/Types'

export class RuleOrganizationDTO extends DTO {
	static createDataOrganizationDTO(data: TDataOrganization): TDataOrganizationDTO {
		return {
			...data,
			_id: this.objectIDToString(data._id),
			requisites: this.objectIDToString(data.requisites),
		}
	}
	static createDataOrganizationFullInfoDTO(
		data: TDataOrganizationFullInfo
	): TDataOrganizationFullInfoDTO {
		const { requisites } = data
		const requisitesDTO = RequisitesDTO.CreateRequisitesDTO(requisites)
		return { ...data, _id: this.objectIDToString(data._id), requisites: requisitesDTO }
	}
}
