import { DTO } from '../../classes/DTO'
import { CounterpartyDTO } from '../serviceCounterparty/counterparty.dto'
import { TOrder, TOrderDTO, TOrderFullInfo, TOrderFullInfoDTO } from './model/types/Types'

export class ServiceOrderDTO extends DTO {
	static createOrderDTO(data: TOrder): TOrderDTO {
		return { ...data, _id: this.objectIDToString(data._id) }
	}
	static createListOrderDTO(data: TOrder[]): TOrderDTO[] {
		return data.map((el) => this.createOrderDTO(el))
	}
}

export class ServiceOrderFullInfo extends DTO {
	static createOrderFullInfoDTO(data: TOrderFullInfo): TOrderFullInfoDTO {
		const { _id, CounterParty } = data
		return {
			...data,
			_id: this.objectIDToString(_id),
			CounterParty: CounterpartyDTO.createCounterpartyDTO(CounterParty),
		}
	}

	static createListOrderFullInfoDTO(data: TOrderFullInfo[]): TOrderFullInfoDTO[] {
		return data.map((el) => this.createOrderFullInfoDTO(el))
	}
}
