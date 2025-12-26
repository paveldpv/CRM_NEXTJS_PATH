import { TValueCell, TValueTablePrice } from './Types'

export const createVoidRow = (countRow = 0): TValueTablePrice => {
	const newDataRow:TValueCell[] = new Array(countRow).fill(0).map((_)=>({value:''}))	
	return [newDataRow]
}
