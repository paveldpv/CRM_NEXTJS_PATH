import { TEntities } from '@/shared/model/types/abstractsType'
import { Types } from 'mongoose'
import { keyColorOption, keyConfigLayout, nameSettingLayout } from './Enums'

type RGB = `rgb(${number}, ${number}, ${number})`
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`
type HEX = `#${string}`

export type TConfigAPP = {
	idUser: Types.ObjectId
	configHeader: TConfigLayout
	configMain: TConfigLayout
	configNavMenu: TConfigLayout
} & TEntities

export type TNewTConfigApp = Omit<TConfigAPP, '_id'>

export type TColorConfig = {
	bgColor: string | RGB | RGBA | HEX
	textColor: string | RGB | RGBA | HEX
	borderColor: string | RGB | RGBA | HEX
}

export type TConfigLayout = {
	name: nameSettingLayout
	color: TColorConfig
	textSize: string
	font: string
	keyConfig: keyConfigLayout
}

export type TUpdateStateConfigApp = {
	name: string
	value: string
	key: keyConfigLayout
	keyColorOption: keyColorOption
}

export type TConfigAPP_DTO = Omit<TConfigAPP, '_id'|"idUser"> & { _id: string,idUser:string }

//#endregion
