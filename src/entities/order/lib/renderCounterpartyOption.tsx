import { maskPhoneNumber } from '@/shared/lib/utils/formatPhoneNumber'
import { TCounterpartyDTO } from '@/shared/model/types'
import { AutoCompleteProps } from 'antd'
import { FaHandshake } from 'react-icons/fa'

export const renderCounterpartyOption = (data?: TCounterpartyDTO[] | null): AutoCompleteProps[] => {
	if (!data || data.length === 0) {
		return []
	}

	return data.map((cp) => {
		return {
			value: cp._id,
			data: cp,
			label: (
				<div className='flex'>
					<p className='flex flex-row'>
						<span>{maskPhoneNumber(cp.phone)}</span>
						<span>{cp?.name}</span>
						<span>{cp?.email}</span>
					</p>
					<span>
						<FaHandshake />
					</span>
					<span>{cp?.INN}</span>
				</div>
			),
		}
	})
}
