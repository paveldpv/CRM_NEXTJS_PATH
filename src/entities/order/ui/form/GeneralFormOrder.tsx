'use client'
import { FetchCounterparty } from '@/shared/api'
import { TCounterpartyDTO } from '@/shared/model/types'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { TFocusForm, TGeneralFormOrder } from '../../model/Type'
import FormCounterparty from './FormCounterparty'
import FormDetails from './FormDetails'
import FormOrder from './FormOrder'

export default function GeneralFormOrder({
	permission,
	serOpenForm,
	setDataOrder,
	setLoader,
	selectedOrder,
}: TGeneralFormOrder) {
	const [counterparty, setCounterparty] = useState<TCounterpartyDTO[]>([])
	const [selectedCounterpartyID, setSelectCounterpartyID] = useState<string | null>(null)
	const [loadForm, setLoadForm] = useState(true)
	const [focusForm, setFocusForm] = useState<TFocusForm>('ORDER')

	const params = useParams()
	const INN = params!.INN as string // для route /[INN]/*

	useEffect(() => {
		if (!selectedOrder) {
			setLoadForm(false)
			return
		}
		;(async () => {
			const dataCounterparty = await FetchCounterparty.getAllCounterparty(INN)
			setCounterparty(dataCounterparty)
			setLoadForm(false)
		})()
	}, [selectedOrder])

	return (
		<div className=' bg-gray-100 p-4 h-full overflow-hidden'>
			<div className='grid grid-cols-12 grid-rows-6 gap-4 h-screen'>
				<div className='col-span-12 row-span-3 grid grid-cols-2 gap-4'>
					<FormOrder setFocusForm={setFocusForm} focusForm={focusForm} permission={permission} />
					<FormCounterparty
						permission={permission}
						setFocusForm={setFocusForm}
						focusForm={focusForm}
						setLoadForm={setLoadForm}
						counterparty={counterparty}
						setCounterparty={setCounterparty}
						selectedCounterpartyID={selectedCounterpartyID}
						setSelectCounterpartyID={setSelectCounterpartyID}
					/>
				</div>
				<FormDetails setFocusForm={setFocusForm} focusForm={focusForm} permission={permission} />
			</div>
		</div>
	)
}
