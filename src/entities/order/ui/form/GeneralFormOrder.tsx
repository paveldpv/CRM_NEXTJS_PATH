'use client'
import { TCounterpartyDTO, TNewOrderDTO, TOrderDTO } from '@/shared/model/types'
import { useMemo, useState } from 'react'

import { TGeneralFormOrder } from '../../model/Types'
import FormCounterparty from './FormCounterparty'
import FormDetails from './FormDetails'
import FormOrder from './FormOrder'

import { FetchOrder } from '@/shared/api'
import useGeo from '@/shared/model/hooks/useGeo'
import { useInfoUser } from '@/shared/model/store/storeInfoUser'
import { PURPOSE_USE, TOrderFullInfoDTO } from '@/shared/model/types'
import CusSpin from '@/shared/ui/loaders/CusSpin'
import { useCusSnackbar } from '@/shared/ui/snackbar/model/useSnackbar.store'
import { Form, Formik, FormikHelpers } from 'formik'
import { useParams, useRouter } from 'next/navigation'
import { validationSchemaOrder } from '../../lib/validater.order'

export default function GeneralFormOrder({ listCounterparty, order }: TGeneralFormOrder) {
	const permission = useInfoUser((state) => state.permission)
	const dataUser = useInfoUser((state) => state.dataUser)
	const [counterparty, setCounterparty] = useState<TCounterpartyDTO[]>(listCounterparty || [])
	const [loader, setLoader] = useState(false)

	const setSnackbar = useCusSnackbar((state) => state.setChildren)
	const setOpenSnackbar = useCusSnackbar((state) => state.setOpen)

	const router = useRouter()
	const params = useParams()
	const INN = params!.INN as string
	const USER_ID = params!.USER_ID as string

	const { dataGeo } = useGeo(USER_ID, PURPOSE_USE.redact)

	const initialValues = useMemo<Partial<TOrderFullInfoDTO>>(
		() =>
			order || {
				_id: '',
				complied: false,
				numberOrder: 0,
				details: [],
				service: {
					deadlines: {
						startDate: new Date(),
					},
				},
			},
		[order],
	)
	
	const handleSubmit = async (values: Partial<TOrderFullInfoDTO>, helpers: FormikHelpers<Partial<TOrderFullInfoDTO>>) => {
		const errors = helpers.validateForm()
		if (Object.keys(errors).length > 0) {
			const errorMessages = Object.values(errors).join(', ')
			setSnackbar(errorMessages)
			setOpenSnackbar({ open: true, autoHidden: true })
			return
		}
		setLoader(true)
		if (!values._id) {
			const newOrderData: TNewOrderDTO = {
				CounterParty: values.CounterParty?._id || '',
				acceptedOfCargoEmployeeId: dataUser?._id || USER_ID,
				service: values.service || {
					deadlines: {
						startDate: new Date(),
					},
				},
				payment: values.payment,
				optionsDescription: values.optionsDescription,
			}

			const newOrder = await FetchOrder.createOrder(INN, newOrderData, dataGeo)

			if (newOrder && newOrder._id) {
				router.push(`/${INN}/${USER_ID}/main/order/${newOrder._id}`)
				router.refresh()
			}
			setLoader(false)
		} else {
			const updateOrderData: TOrderDTO = {
				safeDeleted: false,
				_id: values._id,
				CounterParty: values.CounterParty?._id || '',
				acceptedOfCargoEmployeeId: dataUser?._id || USER_ID,
				complied: values.complied || false,
				numberOrder: values.numberOrder || 0,
				details: values.details || [],
				service: values.service || {
					deadlines: {
						startDate: new Date(),
					},
				},
				payment: values.payment,
				optionsDescription: values.optionsDescription,
				processCompleted: values.processCompleted,
			}

			await FetchOrder.updateOrder(INN, updateOrderData, dataGeo)
			router.refresh()
			setLoader(false)
		}
	}

	return (
		<Formik
		
			initialValues={initialValues}
			enableReinitialize
			validationSchema={validationSchemaOrder}
			onSubmit={handleSubmit}
		>
			{({ values }) => (
				<Form className=' bg-gray-100 p-4  overflow-hidden w-full  '>
					{loader ? (
						<div className='flex items-center justify-center h-full'>
							<CusSpin visible={loader} />
						</div>
					) : (
						<div className='grid  gap-2 h-screen'>
							<div className=' row-span-3  grid grid-cols-3 gap-1  '>							
								<FormOrder permission={permission} />
								<FormCounterparty
									setCounterparty={setCounterparty}
									permission={permission}
									counterparty={counterparty}
									selectedCounterparty={values.CounterParty}
								/>
							</div>
							<FormDetails
								permission={permission}
								idOrder={values._id}
								amountDetails={values.details?.length || 0}
								numberOrder={values.numberOrder}
							/>
						</div>
					)}
				</Form>
			)}
		</Formik>
	)
}
