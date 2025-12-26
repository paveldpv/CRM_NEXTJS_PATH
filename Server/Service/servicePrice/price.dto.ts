import { DTO } from '../../classes/DTO'
import { TPrice, TPriceDTO } from './model/types/Types'

export class PriceDTO extends DTO {
	static createPriceDTO(data: TPrice): TPriceDTO {
		return {
			readonly: data.readonly,
			price: { ...data.price, _id: this.objectIDToString(data.price._id) },
		}
	}
}
