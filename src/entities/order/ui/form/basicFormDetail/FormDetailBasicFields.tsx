'use client'

import { TFormDetailBasicFields } from '@/entities/order/model/Types'
import CusButton from '@/shared/ui/button/ui/CusButton'
import { Checkbox, Input, InputNumber } from 'antd'
import { FieldArray, FieldArrayRenderProps } from 'formik'
import { FaMinus, FaPlus } from 'react-icons/fa'

export default function FormDetailBasicFields({
	values,
	completedDetail,
	setFieldValue,
	redactDetail,
}: TFormDetailBasicFields) {
	return (
		<div className='flex flex-col gap-4'>
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
					{redactDetail && values.amount === values.completedAmount && (
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
						<div className='flex flex-col gap-2'>
							{values.description?.map((_: string, index: number) => (
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
					<label className='text-xs font-bold'>Цена за шт.</label>
					<InputNumber
						value={values.price?.price}
						onChange={(val) => setFieldValue('price.price', val)}
						className='w-full'
						formatter={(value) => `₽ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						parser={(value) => (value ? Number(value.replace(/\s/g, '')) : 0)}
					/>
				</div>

				{values.price?.price && (
					<div className='flex flex-col justify-end'>
						<label className='text-xl underline font-bold'>Общая цена: {values.amount * values.price.price}</label>
					</div>
				)}
			</div>
		</div>
	)
}
