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
import { Checkbox, Input, InputNumber, Select, Tooltip } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import { FieldArray, FieldArrayRenderProps, Form, Formik } from 'formik'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaImage, FaInfoCircle, FaMinus, FaPlus, FaQuestionCircle, FaSave } from 'react-icons/fa'
import { TFormUpdateDetail } from '../../model/Types'

export default function FormUpdateDetail({
	redactDetail,
	idOrder,
	numberOrder,
	setModalDetail,
	setDetails,
	setLoader,
}: TFormUpdateDetail) {
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
	}, [redactDetail, INN])

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

	const handleSubmit = async (values: Partial<TDetailDTO>) => {
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
			if (assemblyParams.has('idAssembly') && assemblyParams.get('idAssembly')!=null) {
				const idAssembly = assemblyParams.get('idAssembly')  as string
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

	const addNewProperty = async (value: string) => {
		const isNewProperty = propertyDetail.some((prop) => prop.property.trim().toLowerCase() === value.trim().toLowerCase())
		if (!isNewProperty) return
		await FetchPropertyDetail.addPropertyDetail(INN, value, dataGeo)
	}

	return (
		<CusConfigProvider>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
				{({ values, setFieldValue }) => (
					<Form className='p-4'>
						<Fieldset legend={numberOrder ? `Заказ №: ${numberOrder}` : <FaInfoCircle />} className='flex flex-col gap-4'>
							<div className='grid grid-cols-2 gap-4'>
								<div className='flex flex-col gap-1'>
									<label className='text-xs font-bold'>Имя детали</label>
									<Input
										value={values.nameDetail}
										onChange={(e) => setFieldValue('nameDetail', e.target.value)}
										placeholder='Введите название детали'
									/>
								</div>
								<div className='flex items-end pb-2 gap-2'>
									{redactDetail && (
										<Checkbox
											checked={values.completed}
											onChange={(e) => {
												setFieldValue('completed', e.target.checked)
												completedDetail()
											}}
										>
											Завершены
										</Checkbox>
									)}
								</div>
							</div>

							<div className='grid grid-cols-2 gap-4 mt-4'>
								<div className='flex flex-col gap-1'>
									<label className='text-xs font-bold'>Количество</label>
									<div className='flex items-center gap-2'>
										<CusButton
											type='button'
											className='w-8 h-8 p-0 flex items-center justify-center'
											onClick={() => setFieldValue('amount', Math.max(1, (values.amount || 1) - 1))}
											disabled={(values.amount || 1) <= 1}
										>
											<FaMinus size={10} />
										</CusButton>
										<InputNumber
											min={1}
											max={9999}
											value={values.amount}
											onChange={(val) => setFieldValue('amount', val)}
											className='w-20'
										/>
										<CusButton
											type='button'
											className='w-8 h-8 p-0 flex items-center justify-center'
											onClick={() => setFieldValue('amount', Math.min(9999, (values.amount || 1) + 1))}
											disabled={(values.amount || 1) >= 9999}
										>
											<FaPlus size={10} />
										</CusButton>
									</div>
								</div>

								{redactDetail && (
									<div className='flex flex-col gap-1'>
										<label className='text-xs'>Завершено (кол-во)</label>
										<InputNumber
											min={0}
											max={values.amount}
											value={values.completedAmount}
											onChange={(val) => setFieldValue('completedAmount', val)}
											className='w-full'
										/>
									</div>
								)}
							</div>

							<div className='mt-4'>
								<label className='text-xs font-bold'>Описание</label>
								<FieldArray name='description'>
									{({ push, remove }: FieldArrayRenderProps) => (
										<div className='flex flex-col gap-2 '>
											{values.description?.map((_, index) => (
												<div key={index} className='flex gap-2'>
													<Input
														maxLength={50}
														value={values.description?.[index]}
														onChange={(e) => setFieldValue(`description.${index}`, e.target.value)}
														placeholder='Описание (макс. 50 симв.)'
													/>
													{index === (values.description?.length || 1) - 1 && (
														<CusButton
															type='button'
															className='w-8 h-8 p-0 flex items-center justify-center'
															onClick={() => push('')}
														>
															<FaPlus size={10} />
														</CusButton>
													)}
													{values.description && values.description.length > 1 && (
														<CusButton
															type='button'
															className='w-8 h-8 p-0 flex items-center justify-center bg-red-500 border-red-500'
															onClick={() => remove(index)}
														>
															<FaMinus size={10} />
														</CusButton>
													)}
												</div>
											))}
										</div>
									)}
								</FieldArray>
							</div>
							<div className='grid grid-cols-2 gap-4 mt-4'>
								<div className='flex flex-col gap-1'>
									<div className=' flex flex-col gap-2'>
										<label className='text-xs  font-bold'>Цена за шт.</label>
										<InputNumber
											value={values.price?.price}
											onChange={(val) => setFieldValue('price.price', val)}
											className='w-full'
											formatter={(value) => `₽ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
											parser={(value) => (value ? Number(value.replace(/\s/g, '')) : 0)}
										/>
									</div>
									{values.price?.price && (
										<label className=' text-xl underline font-bold'>Общая цена :{values.amount * values.price?.price}</label>
									)}
								</div>

								<div className='flex flex-col gap-1'>
									<label className='text-xs font-bold'>Свойства детали</label>
									<Select
										options={propertyDetail}
										mode='tags'
										style={{ width: '100%' }}
										placeholder='Добавьте свойства'
										value={values.propertyDetail}
										onChange={(val) => {
											setFieldValue('propertyDetail', val)
											addNewProperty(val[val.length - 1])
										}}
									/>
									<Tooltip title='Процесс обработки детали'>
										<span>
											<FaQuestionCircle className='ml-2 text-lg' />
										</span>
									</Tooltip>
								</div>
							</div>

							<div className='grid grid-cols-2 gap-4 mt-4'>
								<div className='flex flex-col gap-1'>
									<label className='text-xs font-bold'>Эскиз</label>
									<CusButton
										type='button'
										className='flex items-center justify-center gap-2'
										onClick={() => alert('Открытие модалки добавления эскиза')}
									>
										<FaImage /> Добавить эскиз
									</CusButton>
								</div>
								<div className='flex flex-col gap-1'>
									<label className='text-xs font-bold'>Файлы</label>
									<div className='p-2 border border-dashed border-gray-300 rounded text-center text-gray-400 text-xs'>
										Загрузка файлов (заглушка)
									</div>
								</div>
							</div>

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
