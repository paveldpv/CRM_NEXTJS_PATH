
import React from 'react'
import { TEntities } from './abstractsType'
import { idLink } from './enums'
import { TError } from './subtypes/TError'

export type TLink = {
	id: idLink
	href: string
	description: string
	title: string|React.ReactNode
	paramsHref?: string[]
	readonly?: boolean
}

export type TDBCollectedUsers = Omit<TDBUser, 'password'>

export type TFieldData = {
	[key: string | number]: string | boolean | undefined
	title: string
	placeholder: string
	type: string
	name: string
	multiline?: boolean
}

export type TFormLogin = {
	phone: string
	password: string
	INN: string
}
export type TFormRegistrate = {
	[key: string]: string | boolean | number | TLink[] | Date
	idUser: string	
	email: string
} & TFormLogin

export type TDBUser = {
	phone: string
	password: string
	INN: string
	idUser: string
	email: string
	dateRegistrate?: Date
	name?: string
	surname?: string
	lastName?: string
	dateBirthday?: Date
	nameJobTitle?: string
	linksAllowed: TLink[] | 'ADMIN'
	srcPhoto: 'NOT_FOUND' | TResponseUploadFiles
} & TEntities

export type TWithoutPassUser = Omit<TDBUser, 'password'>

export type TNewEmployee = Pick<
	TDBUser,
	'name' | 'phone' | 'lastName' | 'nameJobTitle' | 'linksAllowed' | 'surname' | 'password' | 'INN'
>

export type TResponse<T=undefined> = {
	status: number
	response: TError | (T extends undefined?'OK':T)
}

export type TAnswerUpdateDB = {
	success: boolean
	message?: string
}

export type TAuthAnswer = {
	hash_password?: string
} & TAnswerUpdateDB

export type TResponseService = {
	success: boolean
	message?: string
	data?: any
}

export type TResponseUploadFiles = {
	FullPath: string
	NameFile: string
	DateTimeUpdateFile: Date
	Errored: boolean
	IDFile: string
	SizeFile?: number
	fileFormat?: string
}
export type TResponseDeletedFile = {
	Approved: boolean
	MessageError?: string
}

export type TErrored = {
	error: boolean
	message?: string
}

