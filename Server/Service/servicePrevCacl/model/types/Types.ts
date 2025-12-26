import { TEntities } from '@/shared/model/types/subtypes/abstractsType'
import { TResponseUploadFiles } from '@/shared/model/types/subtypes/Types'

//#region type prev calc request
export type TSketchDetail = {
	idSketch: string
	lines: TLine[]
	params: TParamsSegment[]
}

export type TLine = {
	idLine: string
	points: number[]
	mark: string
	value?: number
}

export type TParamsSegment = {
	idLine: string
	mark: string
	value: number | string
	description: string
}

export type TInitialValuesFormPrevCalc = {
	[key: string]: string | unknown
	email: string
	phone: string
	name: string
	INN?: string
	surName?: string
	description?: string
	files: 'NOT_FOUND' | TResponseUploadFiles[]
}

export type TPointAuxiliary = {
	startAuxiliary: number[]
	endAuxiliary: number[]
	startAuxiliaryMirror: number[]
	endAuxiliaryMirror: number[]
	pointArrow: number[]
	pointArrowMirror: number[]
	coordinateText: TCoordinate
	coordinateTextMirror: TCoordinate
	angle: number
}

export type TCoordinate = {
	x: number
	y: number
}

export type TRequestPrevCalc = {
	dataClient: TInitialValuesFormPrevCalc
	dataSketch: TSketchDetail[] | undefined
	dateRequest?: Date
	verified?: boolean
	favorites?: boolean
}

export type TDBRequestPrevCalc = TRequestPrevCalc & TEntities

export type TDBRequestPrevCalcDTO = Omit<TDBRequestPrevCalc, '_id'> & { _id: string }
//#endregion
