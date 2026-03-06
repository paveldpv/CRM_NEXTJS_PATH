import { DTO } from '../../classes/DTO'
import { ServiceOrderFullInfoDTO } from '../serviceOrder/order.dto'

import { TDetail, TDetailDTO, TFullInfoTDetail, TFullInfoTDetailDTO } from './model/types/Types'

export class ServiceDetailDTO extends DTO {
	static createDetailDTO(data: TDetail): TDetailDTO {
		return { ...data, _id: this.objectIDToString(data._id), order: this.objectIDToString(data.order) }
	}

	static createListDetailDTO(data: TDetail[]): TDetailDTO[] {
		return data.map((el) => this.createDetailDTO(el))
	}
}

export class ServiceFullInfoDetailDTO extends DTO {
	static createFullInfoDetailDTO(data: TFullInfoTDetail): TFullInfoTDetailDTO {
		return {
			...data,
			_id: this.objectIDToString(data._id),
			order: ServiceOrderFullInfoDTO.createOrderFullInfoDTO(data.order),
		}
	}
	static createListFullInfoOrderDTO(data: TFullInfoTDetail[]): TFullInfoTDetailDTO[] {
		return data.map((el) => this.createFullInfoDetailDTO(el))
	}
}
