import { PURPOSE_USE } from '@/shared/model/types/subtypes/TGeoLocation'

export const processEntry: Record<PURPOSE_USE, { title: string; bgColor: string }> = {
	REDACT: {
		title: 'Изменение данных',
		bgColor: 'linear-gradient(152deg, rgba(255,255,255,1) 0%, rgba(125,211,252,1) 75%)',
	},
	AUTH: {
		title: 'Вход в систему',
		bgColor: 'linear-gradient(152deg, rgba(255,255,255,1) 0%, rgba(132,204,22,1) 75%)',
	},
	REGISTRATE: {
		title: 'Регистрация',
		bgColor: 'linear-gradient(152deg, rgba(255,255,255,1) 0%, rgba(248,113,113,1) 75%)',
	},
}
