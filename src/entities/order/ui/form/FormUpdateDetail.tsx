'use client'
import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import { TDetailDTO } from '@/shared/model/types'
import CusConfigProvider from '@/shared/ui/CusConfigProvider/ui/CusConfigProvider'
import CusButton from '@/shared/ui/button/ui/CusButton'
import { Checkbox, Input, InputNumber, Select } from 'antd'
import { FieldArray, FieldArrayRenderProps, Form, Formik } from 'formik'
import { FaImage, FaInfoCircle, FaMinus, FaPlus, FaSave } from 'react-icons/fa'
import { TFormUpdateDetail } from '../../model/Types'

export default function FormUpdateDetail({
	redactDetail,
	idOrder,
	numberOrder,
	setModalDetail,
	setDetails,
	setLoader,
}: TFormUpdateDetail) {
	const initialValues: Partial<TDetailDTO> = redactDetail || {
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
		console.log('🚀 ~ handleSubmit ~ values:', values)
		// Здесь будет вызов API
		setModalDetail(false)
	}
	const complitedDetail = async () => {}

	return (
		<CusConfigProvider>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
				{({ values, setFieldValue }) => (
					<Form className='p-4'>
						<Fieldset legend={numberOrder ? `Заказ №: ${numberOrder}` : <FaInfoCircle />} className='flex flex-col gap-4'>
							<div className='grid grid-cols-2 gap-4'>
								<div className='flex flex-col gap-1'>
									<label className='text-xs'>Имя детали</label>
									<Input
										value={values.nameDetail}
										onChange={(e) => setFieldValue('nameDetail', e.target.value)}
										placeholder='Введите название детали'
									/>
								</div>
								<div className='flex items-end pb-2 gap-2'>
									<Checkbox
										checked={values.completed}
										onChange={(e) => {
											setFieldValue('completed', e.target.checked)
											complitedDetail()
										}}
									>
										Завершены
									</Checkbox>
								</div>
							</div>

							<div className='grid grid-cols-2 gap-4 mt-4'>
								<div className='flex flex-col gap-1'>
									<label className='text-xs'>Количество</label>
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
								<label className='text-xs'>Описание</label>
								<FieldArray name='description'>
									{({ push, remove }: FieldArrayRenderProps) => (
										<div className='flex flex-col gap-2'>
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
									<label className='text-xs'>Цена</label>
									<InputNumber
										value={values.price?.price}
										onChange={(val) => setFieldValue('price.price', val)}
										className='w-full'
										formatter={(value) => `₽ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
										parser={(value) => (value ? Number(value.replace(/\s/g, '')) : 0)}
									/>
								</div>
								<div className='flex flex-col gap-1'>
									<label className='text-xs'>Свойства детали</label>
									<Select
										mode='tags'
										style={{ width: '100%' }}
										placeholder='Добавьте свойства'
										value={values.propertyDetail}
										onChange={(val) => {
											setFieldValue('propertyDetail', val)
											alert(`Свойства изменены: ${val.join(', ')}`)
										}}
									/>
								</div>
							</div>

							<div className='grid grid-cols-2 gap-4 mt-4'>
								<div className='flex flex-col gap-1'>
									<label className='text-xs'>Эскиз</label>
									<CusButton
										type='button'
										className='flex items-center justify-center gap-2'
										onClick={() => alert('Открытие модалки добавления эскиза')}
									>
										<FaImage /> Добавить эскиз
									</CusButton>
								</div>
								<div className='flex flex-col gap-1'>
									<label className='text-xs'>Файлы</label>
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
