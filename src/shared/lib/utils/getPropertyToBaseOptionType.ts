import { TPropertyDetailDTO } from '@/shared/model/types'
import { BaseOptionType } from 'antd/es/select'

export function getPropertyStrings(properties: TPropertyDetailDTO[]): BaseOptionType[] {
	if (properties.length == 0) return []
	return properties.map((prop) => ({
		value: prop.property,
		label: prop.property,
	}))
}
