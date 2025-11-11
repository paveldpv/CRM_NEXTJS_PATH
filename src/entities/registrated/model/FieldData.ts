import { TFieldData } from '@/shared/model/types/subtypes/Types'

export const fieldData: TFieldData[] = [
	{ name: 'email', title: 'email', placeholder: 'эл.почта*', type: 'email' },
	{ name: 'phone', title: 'phone', placeholder: 'номер тел.*', type: 'phone' },
	{ name: 'password', title: 'password', placeholder: 'пароль*', type: 'password' },
	{ name: 'INN', title: 'INN', placeholder: 'ИНН*', type: 'number' },
]
