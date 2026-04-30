'use client'
import { FetchDetail } from '@/shared/api'
import { FetchAssemblyDetail } from '@/shared/api/detail/FetchAssemblyDeatail'
import { FetchPropertyDetail } from '@/shared/api/propertyDetail/fetchPropertyDetail'
import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import { getNewProperties } from '@/shared/lib/utils/getNewPropertiesDeatil'
import { getPropertyStrings } from '@/shared/lib/utils/getPropertyToBaseOptionType'
import useGeo from '@/shared/model/hooks/useGeo'
import { PURPOSE_USE, TBaseDetailDTO, TDetailDTO, TNewDetailDTO, TPropertyDetailDTO } from '@/shared/model/types'
import CusConfigProvider from '@/shared/ui/CusConfigProvider/ui/CusConfigProvider'
import CusButton from '@/shared/ui/button/ui/CusButton'
import { Modal, ModalProps } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import { Form, Formik } from 'formik'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaInfoCircle, FaSave } from 'react-icons/fa'
import { TFormUpdateDetail } from '../../model/Types'
import FormDetailAttachments from './basicFormDetail/FormDetailAttachments'
import FormDetailBasicFields from './basicFormDetail/FormDetailBasicFields'
import FormDetailProperties from './basicFormDetail/FormDetailProperties'

function FormUpdateDetail({ redactDetail, idOrder, numberOrder, setModalDetail, setDetails, setLoader }: TFormUpdateDetail) {
	const params = useParams()
	const INN = params!.INN as string
	const idEmployee = params!.idEmployee as string
	const searchParams = useSearchParams()

	const { dataGeo } = useGeo(idEmployee, PURPOSE_USE.redact, 'Добавление/редактирование детали')
	const [propertyDetail, setPropertyDetail] = useState<BaseOptionType[]>([])
	const [currentProperty, setCurrentProperty] = useState<TPropertyDetailDTO[]>([])

	useEffect(() => {
		setLoader(true)
		;(async () => {
			const dataPropertyDetail = await FetchPropertyDetail.getProperties(INN)
			setPropertyDetail(getPropertyStrings(dataPropertyDetail))

			setCurrentProperty(dataPropertyDetail)
			setLoader(false)
		})()
	}, [INN])

	const initialValues: TNewDetailDTO | TBaseDetailDTO = redactDetail || {
		entitiesType: 'DETAIL',
		order: idOrder,
		nameDetail: '',
		completed: false,
		amount: 1,
		completedAmount: 0,
		description: [''],
		price: {
			price: 0,
		},
		propertyDetail: [],
	}

	const handleSubmit = async (values: Partial<TNewDetailDTO | TBaseDetailDTO>) => {
		setLoader(true)
		const newPropertyDetail = getNewProperties(values.propertyDetail || [], currentProperty)
		if (newPropertyDetail.length != 0) {
			await FetchPropertyDetail.addPropertyDetailList(INN, newPropertyDetail, dataGeo)
		}

		if (redactDetail) {
			const updatedDetail = {
				...values,
				_id: redactDetail._id,
				order: redactDetail.order,
				description: Array.isArray(values.description) ? values.description.filter(Boolean) : [''],
				propertyDetail: Array.isArray(values.propertyDetail) ? values.propertyDetail : [],
			} as TDetailDTO

			await FetchDetail.updateDataDetail(INN, updatedDetail, dataGeo)
			setDetails((prev) => prev.map((item) => (item._id === updatedDetail._id ? updatedDetail : item)))
			setModalDetail(false)
			
			setLoader(false)
		} else {
			const newDetailData: TNewDetailDTO = {
				entitiesType: 'DETAIL',
				order: idOrder,
				nameDetail: values.nameDetail || '',
				completed: values.completed || false,
				amount: values.amount || 1,
				completedAmount: values.completedAmount || 0,
				description: Array.isArray(values.description) ? values.description.filter(Boolean) : [''],
				price: values.price || { price: 0 },
				propertyDetail: Array.isArray(values.propertyDetail) ? values.propertyDetail : [],
			}
			const assemblyParams = new URLSearchParams(searchParams?.toString())
			if (assemblyParams.has('idAssembly') && assemblyParams.get('idAssembly') != null) {
				const idAssembly = assemblyParams.get('idAssembly') as string
				assemblyParams.delete('idAssembly')
				const createdDetail = await FetchDetail.addDetailForOrder(INN, newDetailData, dataGeo)
				await FetchAssemblyDetail.addComponentAssemblyDetail(INN, idAssembly, createdDetail._id, dataGeo)
				setDetails((prev) =>
					prev.map((detail) =>
						detail._id === idAssembly && detail.entitiesType === 'ASSEMBLY'
							? { ...detail, components: [...detail.components, createdDetail._id] }
							: detail,
					),
				)
			}
			const createdDetail = await FetchDetail.addDetailForOrder(INN, newDetailData, dataGeo)
			setDetails((prev) => [...prev, createdDetail])
			setModalDetail(false)
			setLoader(false)
		}
	}

	const completedDetail = async () => {
		setLoader(true)
		if (!redactDetail) {
			return
		}
		await FetchDetail.completedDetail(INN, redactDetail?._id, redactDetail.order, dataGeo)
		setLoader(false)
	}

	return (
		<CusConfigProvider>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
				{({ values, setFieldValue }) => (
					<Form className='p-4'>
						<Fieldset legend={numberOrder ? `Заказ №: ${numberOrder}` : <FaInfoCircle />} className='flex flex-col gap-4'>
							<FormDetailBasicFields
								completedDetail={completedDetail}
								values={values}
								setFieldValue={setFieldValue}
								redactDetail={!!redactDetail}
							/>
							<FormDetailProperties values={values} setFieldValue={setFieldValue} propertyDetail={propertyDetail} />
							<FormDetailAttachments />
							<div className='flex justify-end mt-6'>
								<CusButton type='submit' className='flex items-center gap-2'>
									<FaSave /> Сохранить
								</CusButton>
							</div>
						</Fieldset>
					</Form>
				)}
			</Formik>
		</CusConfigProvider>
	)
}

export default function FormUpdateDetailModal({ ...props }: TFormUpdateDetail & ModalProps) {
	return (
		<Modal
			classNames={{ container: '!bg-transparent' }}
			open={props.open}
			onCancel={props.onCancel}
			footer={null}
			width={800}
			styles={{
				container: {
					backgroundColor: 'transparent',
				},
			}}
		>
			<FormUpdateDetail {...props} />
		</Modal>
	)
}
