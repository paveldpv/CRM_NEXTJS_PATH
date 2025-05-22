import { ObjectId } from 'mongoose'
import { keyColorOption, keyConfigLayout, nameSettingLayout } from '../enums'

type RGB = `rgb(${number}, ${number}, ${number})`
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`
type HEX = `#${string}`

export type TColorConfig = {
	bgColor: string | RGB | RGBA | HEX
	textColor: string | RGB | RGBA | HEX
	borderColor: string | RGB | RGBA | HEX
}

export type TConfigAPP = {
	idUser: ObjectId
	configHeader: TConfigLayout
	configMain: TConfigLayout
	configNavMenu: TConfigLayout
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

//#endregion
