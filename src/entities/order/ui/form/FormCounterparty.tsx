'use client'
import { FetchCounterparty } from '@/shared/api'
import useGeo from '@/shared/model/hooks/useGeo'
import { PURPOSE_USE, TCounterpartyDTO } from '@/shared/model/types'
import CusButton from '@/shared/ui/button/ui/CusButton'
import CusConfigProvider from '@/shared/ui/CusConfigProvider/ui/CusConfigProvider'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { FaHandshake, FaPlus } from 'react-icons/fa'

import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import { AutoComplete, Input } from 'antd'
import { renderCounterpartyOption } from '../../lib/renderCounterpartyOption'
import { TFormCounterparty } from '../../model/Types'

export default function FormCounterparty({
	permission,
	counterparty,
}: TFormCounterparty) {
	const [formData, setFormData] = useState<TCounterpartyDTO | null>(null)
	const [isEditing, setIsEditing] = useState(false)

	const [phoneValue, setPhoneValue] = useState('')
	const params = useParams()
	const INN = params!.INN as string
	const ID_USER = params!.USER_ID as string // для route /[INN]/*
	const { dataGeo } = useGeo(ID_USER, PURPOSE_USE.redact, 'добавил нового контрагента')

	const handlerChange = (e: string) => {}

	const addNewCounterParty = async () => {
		const dataNewCounterparty = await FetchCounterparty.createCounterparty(INN, { phone: phoneValue }, dataGeo)
		// setCounterparty((prev) => [...prev, dataNewCounterparty]);
	}
	const handleInputChange = (field: keyof TCounterpartyDTO) => (e: React.ChangeEvent<HTMLInputElement>) => {
		if (formData) {
			setFormData({
				...formData,
				[field]: e.target.value,
			})
		}
	}

	return (
		<Fieldset legend={<FaHandshake />}>
			<p>Контрагенты</p>
			<div>
				{permission && counterparty && (
					<div>
						<AutoComplete
							showSearch={{
								filterOption: (inputValue, option) => {
									//TODO:
									console.log('🚀 ~ FormCounterparty ~ option:', option)
									console.log('🚀 ~ FormCounterparty ~ inputValue:', inputValue)
									return false
								},
							}}
							onChange={(e) => setPhoneValue(e)}
							options={renderCounterpartyOption(counterparty)}
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
									<p>
										{/* {format(
                        new Date(currentCounterparty.dateCreate),
                        "DD/mm/YYY",
                      )} */}
									</p>
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
									{/* <Link
                      href={`/payment/counterparty/${currentCounterparty._id}`}
                    >
                      <p>подробнее...</p>
                    </Link> */}
								</li>
							</ul>
						</CusConfigProvider>
					</form>
				)}
			</div>
		</Fieldset>
	)
}
