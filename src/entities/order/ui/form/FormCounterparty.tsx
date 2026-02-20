'use client'
import { FetchCounterparty } from '@/shared/api'
import useGeo from '@/shared/model/hooks/useGeo'
import { PURPOSE_USE, TCounterpartyDTO } from '@/shared/model/types'
import CusButton from '@/shared/ui/button/ui/CusButton'
import CusConfigProvider from '@/shared/ui/CusConfigProvider/ui/CusConfigProvider'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaHandshake, FaPlus } from 'react-icons/fa'

import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import CusSpin from '@/shared/ui/loaders/CusSpin'
import { AutoComplete, Input } from 'antd'
import { format } from 'date-fns'
import Link from 'next/link'
import { renderCounterpartyOption } from '../../lib/renderCounterpartyOption'
import { TFormCounterparty } from '../../model/Types'
export default function FormCounterparty({
	setCounterparty,
	permission,
	counterparty,
	selectedCounterparty,
	onSelectCounterparty,
}: TFormCounterparty) {
	const [formData, setFormData] = useState<TCounterpartyDTO | null>(null)
	const [isEditing, setIsEditing] = useState(false)

	const [phoneValue, setPhoneValue] = useState('')

	const [loader, setLoader] = useState(true)

	const params = useParams()
	const INN = params!.INN as string
	const ID_USER = params!.USER_ID as string
	const { dataGeo } = useGeo(ID_USER, PURPOSE_USE.redact, 'добавил нового контрагента')

	useEffect(() => {
		if (selectedCounterparty) {
			setIsEditing(false)
			setFormData(selectedCounterparty)
			setLoader(false)
		} else {
			setIsEditing(true)
			setLoader(false)
		}
	}, [selectedCounterparty])

	const handlerChange = (e: string) => {}

	const addNewCounterParty = async () => {
		setLoader(true)
		const dataNewCounterparty = await FetchCounterparty.createCounterparty(INN, { phone: phoneValue }, dataGeo)
		setCounterparty((prev) => [...prev, dataNewCounterparty])
		setIsEditing(true)
		setFormData(dataNewCounterparty)
		onSelectCounterparty(dataNewCounterparty)
		setLoader(false)
	}

	const handleSelect = (value: string, option: any) => {
		const selected = counterparty?.find((c) => c._id === option.key)
		if (selected) {
			setFormData(selected)
			onSelectCounterparty(selected)
		}
	}

	const handleInputChange = (field: keyof TCounterpartyDTO) => (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(`input handler change ${e}`)
		if (formData) {
			const updated = {
				...formData,
				[field]: e.target.value,
			}
			setFormData(updated)
			onSelectCounterparty(updated) // Синхронизируем с Formik
		}
	}

	return (
		<Fieldset legend={<FaHandshake />}>
			{loader ? (
				<CusSpin visible={loader} />
			) : (
				<div>
					{permission && !formData && (
						<div className=' flex  flex-row gap-2'>
							<AutoComplete
								showSearch={{
									filterOption: (inputValue, option: any) =>
										(option?.label ?? '').toString().toLowerCase().includes(inputValue.toLowerCase()),
								}}
								onSelect={handleSelect}
								onChange={(e) => setPhoneValue(e)}
								options={renderCounterpartyOption(counterparty || [])}
							>
								<Input placeholder='Тел' />
							</AutoComplete>
							{phoneValue && (
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
									<li className='flex flex-col'>
										<p>{format(new Date(formData.dateCreate), 'DD/MM/yy')}</p>
										<label className='text-xs text-gray-500 mt-1'>добавлен:</label>
									</li>
									<div className='flex flex-col'>
										<Input
											name='phone'
											value={formData.phone}
											onChange={handleInputChange('phone')}
											placeholder='тел.'
											disabled={!permission || !isEditing}
										/>
										<label className='text-xs text-gray-500 mt-1'>телефон</label>
									</div>
									<div className='flex flex-col'>
										<Input
											name='INN'
											value={formData.INN || ''}
											onChange={handleInputChange('INN')}
											placeholder='ИНН'
											disabled={!permission || !isEditing}
										/>
										<label className='text-xs text-gray-500 mt-1'>ИНН</label>
									</div>
									<div className='flex flex-col'>
										<Input
											name='name'
											value={formData.name || ''}
											onChange={handleInputChange('name')}
											placeholder='имя'
											disabled={!permission || !isEditing}
										/>
										<label className='text-xs text-gray-500 mt-1'>имя</label>
									</div>
									<div className='flex flex-col'>
										<Input
											name='email'
											value={formData.email || ''}
											onChange={handleInputChange('email')}
											placeholder='почта@'
											disabled={!permission || !isEditing}
										/>
										<label className='text-xs text-gray-500 mt-1'>почта</label>
									</div>
									<li>
										<p className=' text-2xl'> реквизиты</p>
									</li>
									<li>
										<Link href={`/payment/counterparty/${formData._id}`}>
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
