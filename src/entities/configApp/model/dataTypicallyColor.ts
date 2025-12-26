import { keyConfigLayout, nameSettingLayout } from '@/shared/model/types/subtypes/enums'
import { TConfigAPP } from '@/shared/model/types/subtypes/TAppearanceConfigApp'
type TTypicalSchema = Omit<TConfigAPP, 'idUser'> & { index: number }

export const dataTypicallyColor: TTypicalSchema[] = [
	{
		index: 0,
		configHeader: {
			keyConfig: keyConfigLayout.header,
			name: nameSettingLayout.header,
			color: {
				bgColor: '#fe6c3a',
				textColor: '#b8c0c7,',
				borderColor: '#fe6c3a',
			},
			font: 'Comfortaa',
			textSize: '1.5rem',
		},
		configMain: {
			keyConfig: keyConfigLayout.main,
			name: nameSettingLayout.main,
			color: {
				bgColor: ' #ffffff ',
				textColor: '#b8c0c7,',
				borderColor: '#ffffff',
			},
			font: 'Comfortaa',
			textSize: '1.5rem',
		},
		configNavMenu: {
			keyConfig: keyConfigLayout.navMenu,
			name: nameSettingLayout.navMenu,
			color: {
				bgColor: '#2c3039',
				textColor: '#b8c0c7,',
				borderColor: '#2c3039',
			},
			font: 'Comfortaa',
			textSize: '1.5rem',
		},
	},
	{
		index: 1,
		configHeader: {
			keyConfig: keyConfigLayout.header,
			name: nameSettingLayout.header,
			color: {
				bgColor: ' #040000,',
				textColor: '#80679b',
				borderColor: '#090709',
			},
			font: 'Comfortaa',
			textSize: '1.5rem',
		},
		configMain: {
			keyConfig: keyConfigLayout.main,
			name: nameSettingLayout.main,
			color: {
				bgColor: '#0e061b',
				textColor: '#80679b',
				borderColor: '#090709',
			},
			font: 'Comfortaa',
			textSize: '1.5rem',
		},
		configNavMenu: {
			keyConfig: keyConfigLayout.navMenu,
			name: nameSettingLayout.navMenu,
			color: {
				bgColor: ' #241838',
				textColor: '#80679b',
				borderColor: '#090709',
			},
			font: 'Comfortaa',
			textSize: '1.5rem',
		},
	},
	{
		index: 2,
		configHeader: {
			keyConfig: keyConfigLayout.header,
			name: nameSettingLayout.header,
			color: {
				bgColor: '#000000',
				textColor: '#f1ca28',
				borderColor: '#f1ca28',
			},
			font: 'Comfortaa',
			textSize: '1.5rem',
		},
		configMain: {
			keyConfig: keyConfigLayout.main,
			name: nameSettingLayout.main,
			color: {
				bgColor: '#000000',
				textColor: '#f1ca28',
				borderColor: '#f1ca28',
			},
			font: 'Comfortaa',
			textSize: '1.5rem',
		},
		configNavMenu: {
			keyConfig: keyConfigLayout.navMenu,
			name: nameSettingLayout.navMenu,
			color: {
				bgColor: '#000000',
				textColor: '#f1ca28',
				borderColor: '#f1ca28',
			},
			font: 'Comfortaa',
			textSize: '1.5rem',
		},
	},
	{
		index: 3,
		configHeader: {
			keyConfig: keyConfigLayout.header,
			name: nameSettingLayout.header,
			color: {
				bgColor: '#F47C28',
				textColor: '#D1D5E3 ',
				borderColor: '#F47C28',
			},
			font: 'Comfortaa',
			textSize: '1.5rem',
		},
		configMain: {
			keyConfig: keyConfigLayout.main,
			name: nameSettingLayout.main,
			color: {
				bgColor: '#D1D5E3 ',
				textColor: '#4F5162',
				borderColor: '#D1D5E3 ',
			},
			font: 'Comfortaa',
			textSize: '1.5rem',
		},
		configNavMenu: {
			keyConfig: keyConfigLayout.navMenu,
			name: nameSettingLayout.navMenu,
			color: {
				bgColor: '#858692',
				textColor: '#FFFFFF ',
				borderColor: '#858692',
			},
			font: 'Comfortaa',
			textSize: '1.5rem',
		},
	},
]
