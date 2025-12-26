import { DTO } from '../../classes/DTO'
import { TDBRequestPrevCalc, TDBRequestPrevCalcDTO } from './model/types/Types'

export class ServicePrevCalcDTO extends DTO {
	static createPrevCalcDTO(data:TDBRequestPrevCalc):TDBRequestPrevCalcDTO{
		return {...data,_id:this.objectIDToString(data._id)}
	}
	static createListPrevCalcDTO(data:TDBRequestPrevCalc[]){
		return data.map(el=>this.createPrevCalcDTO(el))
	}
}
