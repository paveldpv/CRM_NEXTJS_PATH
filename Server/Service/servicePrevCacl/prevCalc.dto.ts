import { DTO } from '../../classes/DTO'
import { TDBRequestPrevCalc, TDBRequestPrevCalcDTO } from './model/types/Types'

export class servicePrevCalcDTO extends DTO {
	static createPrevCalcDTO(data:TDBRequestPrevCalc):TDBRequestPrevCalcDTO{
		return {...data,_id:this.objectIDToString(data._id)}
	}
}
