import { keyConfigLayout, nameSettingLayout } from '@/shared/model/types/enums'
import { TConfigAPP } from '@/shared/model/types/subtypes/TAppearanceConfigApp'
import { TError } from '@/shared/model/types/subtypes/TError'
import { Service } from '../classes/Service'
import ControllerConfigDB from '../ControllersDB/Collection/ConfigAppDB'

export class ServiceConfigApp extends Service {
	constructor(INN: string) {
		super(INN)
	}
	private getInitialConfigApp(idUser: string): TConfigAPP {
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

	public async addNewPersonalConfig(idUser: string): Promise<void | TError> {
		try {			
			
			const initialConfigApp = this.getInitialConfigApp(idUser)
			await new ControllerConfigDB(this.INN).addNewPersonalConfigApp(initialConfigApp)
		} catch (error) {
			const err: TError = {
				error: true,
				message: `error add new personal config app, error ${error}`,
			}
			this.logError(err)
			return err
		}
	}

	public async getPersonalConfig(idUser: string): Promise<null | TConfigAPP | TError> {
		try {
			const controllerConfigDB = new ControllerConfigDB(this.INN)
			const dataPersonalConfig = await controllerConfigDB.getPersonalConfigApp(idUser)
			return this.normalizeDataFromMongoDB(dataPersonalConfig)
		} catch (error) {
			const er: TError = {
				error: true,
				message: `error get personal config app , id user :${idUser},error :${error}`,
			}
			this.logError(er)
			return er
		}
	}
	public async updatePersonalConfig(newDataConfig: TConfigAPP): Promise<void | TError> {
		try {
			const controllerConfigDB = new ControllerConfigDB(this.INN)
			return await controllerConfigDB.updatePersonalConfigApp(newDataConfig)
		} catch (error) {
			const er: TError = {
				error: true,
				message: `error update personal config app ,new Data config app  :${newDataConfig}, error ${error}`,
			}
			this.logError(er)
			return er
		}
	}
}
