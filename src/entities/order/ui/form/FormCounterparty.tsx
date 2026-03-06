'use client'
import { FetchCounterparty } from '@/shared/api'
import useGeo from '@/shared/model/hooks/useGeo'
import { PURPOSE_USE, TCounterpartyDTO, TOrderFullInfoDTO } from '@/shared/model/types'
import CusButton from '@/shared/ui/button/ui/CusButton'
import CusConfigProvider from '@/shared/ui/CusConfigProvider/ui/CusConfigProvider'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaExchangeAlt, FaHandshake, FaPlus } from 'react-icons/fa'

import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import CusSpin from '@/shared/ui/loaders/CusSpin'
import { AutoComplete, Input } from 'antd'
import { format } from 'date-fns'
import { useFormikContext } from 'formik'
import Link from 'next/link'
import { renderCounterpartyOption } from '../../lib/renderCounterpartyOption'
import { TFormCounterparty } from '../../model/Types'
export default function FormCounterparty({
	setCounterparty,
	permission,
	counterparty,
	selectedCounterparty,
}: Omit<TFormCounterparty, 'onSelectCounterparty'>) {
	const { setFieldValue } = useFormikContext<TOrderFullInfoDTO>()
	const [formData, setFormData] = useState<TCounterpartyDTO | null>(null)

	const [phoneValue, setPhoneValue] = useState('')

	const [loader, setLoader] = useState(true)
	const pathname = usePathname()
	const params = useParams()
	const INN = params!.INN as string
	const ID_USER = params!.USER_ID as string
	const { dataGeo } = useGeo(ID_USER, PURPOSE_USE.redact, 'добавил нового контрагента')

	useEffect(() => {
		if (selectedCounterparty) {
			setFormData(selectedCounterparty)
			setPhoneValue(selectedCounterparty.phone)
			setLoader(false)
		} else {
			setLoader(false)
		}
	}, [selectedCounterparty])

	const addNewCounterParty = async () => {
		setLoader(true)
		const dataNewCounterparty = await FetchCounterparty.createCounterparty(INN, { phone: phoneValue }, dataGeo)

		setCounterparty((prev) => [...prev, dataNewCounterparty])
		setFormData(dataNewCounterparty)
		setPhoneValue(dataNewCounterparty.phone)

		setFieldValue('CounterParty', dataNewCounterparty, true)
		setLoader(false)
	}

	const handleSelect = (value: string, option: any) => {
		console.log('handleSelect called with value:', value, 'option:', option)

		const selected = counterparty?.find((c) => c._id === option.key)
		console.log('found selected:', selected)

		if (selected) {
			setFormData(selected)
			setPhoneValue(selected.phone)
			setFieldValue('CounterParty', selected, true)
		}
	}

	const handleInputChange = (field: keyof TCounterpartyDTO) => (e: React.ChangeEvent<HTMLInputElement>) => {
		if (formData) {
			const updated = {
				...formData,
				[field]: e.target.value,
			}
			setFormData(updated)
			setFieldValue('CounterParty', updated, true) // Синхронизируем с Formik
		}
	}

	// Проверяем, есть ли введенный телефон в списке контрагентов
	const isPhoneExists = counterparty?.some((cp) => cp.phone === phoneValue)

	const handleResetCounterparty = () => {
		setFormData(null)
		setPhoneValue('')
		setFieldValue('CounterParty', null, true)
	}

	return (
		<Fieldset legend={<FaHandshake />}>
			{loader ? (
				<CusSpin visible={loader} />
			) : (
				<div>
					{permission && (
						<div className='flex flex-row gap-2 mb-2'>
							<AutoComplete
							disabled={formData!=null}
								style={{ width: '100%' }}
								showSearch={{
									filterOption: (inputValue, option: any) => {
										const filterText = option?.filterText?.toLowerCase() || ''
										return filterText.includes(inputValue.toLowerCase())
									},
								}}
								onSelect={handleSelect}
								onChange={(e) => setPhoneValue(e)}
								value={phoneValue}
								options={renderCounterpartyOption(counterparty || [])}
							>
								<Input placeholder='Тел' />
							</AutoComplete>
							{phoneValue && !isPhoneExists && (
								<CusButton onClick={addNewCounterParty}>
									<FaPlus />
								</CusButton>
							)}
						</div>
					)}

					{formData && (
						<form>
							<CusConfigProvider>
								<ul>
									<li className='flex gap-1 items-center mb-2'>
										<label className='text-sm  mt-1 ml-2'>Добавлен:</label>
										<p className='text-xs'>{format(new Date(formData.dateCreate), 'dd/mm/yy')}</p>
									</li>
									<div className='flex flex-col gap-2'>
										<div className='flex items-center gap-2'>
											<div className='flex-1'>
												<label className='text-xs  mt-1'>телефон</label>
												<Input
													name='phone'
													value={formData.phone}
													onChange={handleInputChange('phone')}
													placeholder='тел.'
													disabled={!permission}
												/>
											</div>
											{permission && (
												<div className='mt-5'>
													<CusButton onClick={handleResetCounterparty}>
														<FaExchangeAlt />
													</CusButton>
												</div>
											)}
										</div>
									</div>
									<div className='flex flex-col'>
										<label className='text-xs  mt-1'>имя</label>
										<Input
											name='name'
											value={formData.name || ''}
											onChange={handleInputChange('name')}
											placeholder='имя'
											disabled={!permission}
										/>
									</div>
									<div className='flex flex-col'>
										<label className='text-xs  mt-1'>ИНН</label>
										<Input
											name='INN'
											value={formData.INN || ''}
											onChange={handleInputChange('INN')}
											placeholder='ИНН'
											disabled={!permission}
										/>
									</div>

									<div className='flex flex-col'>
										<label className='text-xs  mt-1'>почта</label>
										<Input
											name='email'
											value={formData.email || ''}
											onChange={handleInputChange('email')}
											placeholder='почта@'
											disabled={!permission}
										/>
									</div>
									<li className=' mt-2'>
										<Link href={`${pathname}/payment/counterparty/${formData._id}`}>
											<p>подробнее...</p>
										</Link>
									</li>
								</ul>
							</CusConfigProvider>
						</form>
					)}
				</div>
			)}
		</Fieldset>
	)
}
