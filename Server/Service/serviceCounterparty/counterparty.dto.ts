import { DTO } from '../../classes/DTO'
import { TCounterparty, TCounterpartyDTO } from './models/types/Types'

export class CounterpartyDTO extends DTO {
	static createCounterpartyDTO(data:TCounterparty):TCounterpartyDTO {
		return {...data,_id:data._id.toString()}
	}

	static createListCounterpartyDTO (data:TCounterparty[]):TCounterpartyDTO[]{
		return data.map(counterparty=>this.createCounterpartyDTO(counterparty))
	}
}