'use client'
import { TCounterpartyDTO } from '@/shared/model/types'
import { useState } from 'react'

import { TGeneralFormOrder } from '../../model/Types'
import FormCounterparty from './FormCounterparty'
import FormDetails from './FormDetails'
import FormOrder from './FormOrder'

import { TOrderFullInfoDTO } from '@/shared/model/types'
import { Form, Formik } from 'formik'


export default function GeneralFormOrder({ listCounterparty, order }: TGeneralFormOrder) {
	//const permission = useInfoUser((state) => state.permission)
	const permission = true
	const [counterparty, setCounterparty] = useState<TCounterpartyDTO[]>(listCounterparty || [])

	const initialValues: Partial<TOrderFullInfoDTO> = order || {
		_id: '',
		complied: false,
		numberOrder: 0,
		details: [],
		service: {
			deadlines: {
				startDate: new Date(),
			},
		},
	}

	return (
		<Formik
			initialValues={initialValues}
			enableReinitialize
			onSubmit={(values) => {
				console.log('Submit order:', values)
			}}
		>
			{({ values, setFieldValue }) => (
				<Form className=' bg-gray-100 p-4 h-full overflow-hidden w-full'>
					<div className='grid grid-rows-5 gap-2 h-screen'>
						<div className=' row-span-3 grid  grid-cols-3 gap-2 '>
							<FormOrder permission={permission} />
							<FormCounterparty
								setCounterparty={setCounterparty}
								permission={permission}
								counterparty={counterparty}
								selectedCounterparty={values.CounterParty}
								onSelectCounterparty={(selected) => setFieldValue('CounterParty', selected)}
							/>
						</div>
						<FormDetails
							permission={permission}
							idOrder={values._id}
							amountDetails={values.details?.length || 0}
						/>
					</div>
				</Form>
			)}
		</Formik>
	)
}
