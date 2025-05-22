import { keyConfigLayout, nameSettingLayout } from '@/shared/model/types/enums'
import { TConfigAPP } from '@/shared/model/types/subtypes/TAppearanceConfigApp'
import { TError } from '@/shared/model/types/subtypes/TError'

import ControllerConfigDB from './controller/ConfigAppDB.controller'
import { Service } from '../../classes/Service'
import { ObjectId } from 'mongoose'

export class ServiceConfigApp extends Service {
	constructor(INN: string) {
		super(INN)
	}
	private getInitialConfigApp(idUser: ObjectId): TConfigAPP {
		return {
			idUser: idUser,
			configHeader: {
				color: {
					bgColor: '#F47C28',
					textColor: '#4F5162',
					borderColor: '#7281C0',
				},
				font: 'Comfortaa',
				textSize: '1rem',
				name: nameSettingLayout.header,
				keyConfig: keyConfigLayout.header,
			},
			configMain: {
				color: {
					bgColor: '#F47C28',
					textColor: '#4F5162',
					borderColor: '#7281C0',
				},
				font: 'Comfortaa',
				textSize: '1rem',
				name: nameSettingLayout.main,
				keyConfig: keyConfigLayout.main,
			},
			configNavMenu: {
				color: {
					bgColor: '#F47C28',
					textColor: '#4F5162',
					borderColor: '#7281C0',
				},
				font: 'Comfortaa',
				textSize: '1rem',
				name: nameSettingLayout.navMenu,
				keyConfig: keyConfigLayout.navMenu,
			},
		}
	}


	public async addNewPersonalConfig(idUser: ObjectId): Promise<void | TError> {
		try {						
			const initialConfigApp = this.getInitialConfigApp(idUser)
			await new ControllerConfigDB(this.INN).addNewPersonalConfigApp(initialConfigApp)
		} catch (error) {
			
			return this.createError(`error add new personal config app, error ${error}`,error)
		}
	}

	public async getPersonalConfig(idUser: ObjectId): Promise<null | TConfigAPP | TError> {
		try {
			const controllerConfigDB = new ControllerConfigDB(this.INN)
			const dataPersonalConfig = await controllerConfigDB.getPersonalConfigApp(idUser)
			return this.normalizeDataFromMongoDB(dataPersonalConfig)
		} catch (error) {
			
			return this.createError(`error get personal config app , id user :${idUser},error :${error}`,error)
		}
	}
	public async updatePersonalConfig(newDataConfig: TConfigAPP): Promise<void | TError> {
		try {
			const controllerConfigDB = new ControllerConfigDB(this.INN)
			return await controllerConfigDB.updatePersonalConfigApp(newDataConfig)
		} catch (error) {
			
			return this.createError( `error update personal config app ,new Data config app  :${newDataConfig}, error ${error}`,error)
		}
	}
}
