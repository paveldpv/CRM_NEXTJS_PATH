import { TEntities } from '../abstractsType'
import { TResponseUploadFiles } from '../Types'

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
	surName: string
	description: string
	INN: string
	files: unknown | TResponseUploadFiles[]
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
	idRequest?: string
	dateRequest?: Date
	verified?: boolean
	//safeDeleted?: boolean;
	favorites?: boolean
} & TEntities

//#endregion
