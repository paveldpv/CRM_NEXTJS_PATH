'use client'
import { TCounterpartyDTO } from '@/shared/model/types'
import { useState } from 'react'

import { useInfoUser } from '@/shared/model/store/storeInfoUser'
import { TGeneralFormOrder } from '../../model/Types'
import FormCounterparty from './FormCounterparty'
import FormDetails from './FormDetails'
import FormOrder from './FormOrder'

export default function GeneralFormOrder({ listCounterparty, order }: TGeneralFormOrder) {
	const permission = useInfoUser((state) => state.permission)

	const [counterparty, setCounterparty] = useState<TCounterpartyDTO[]>(listCounterparty || [])

	return (
		<div className=' bg-gray-100 p-4 h-full overflow-hidden'>
			<div className='grid grid-rows-5 gap-2 h-screen'>
				<div className=' row-span-3 grid  grid-cols-3 gap-2'>
					<FormOrder permission={permission} order={order} />
					<FormCounterparty permission={permission} counterparty={counterparty} selectedCounterparty={order?.CounterParty} />
				</div>
				<FormDetails permission={permission} idOrder={order?._id}  />
			</div>
		</div>
	)
}
