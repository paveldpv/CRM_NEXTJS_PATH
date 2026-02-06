'use client'
import { AutoComplete, Input } from 'antd'

import { FetchCounterparty } from '@/shared/api'
import CusButton from '@/shared/ui/button/ui/CusButton'
import CusConfigProvider from '@/shared/ui/CusConfigProvider/ui/CusConfigProvider'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { renderCounterpartyOption } from '../../lib/renderCounterpartyOption'
import { TFormCounterparty } from '../../model/Type'
import TitleFormTransform from '../simple/TitleFormTransform'
import { useParams } from 'next/navigation'
import useGeo from '@/shared/model/hooks/useGeo'
import { PURPOSE_USE } from '@/shared/model/types'

export default function FormCounterparty({
	selectedCounterpartyID,
	setCounterparty,
	setSelectCounterpartyID,
	counterparty,
	setFocusForm,
	focusForm,
	setLoadForm,
}: TFormCounterparty) {
	const [phoneValue, setPhoneValue] = useState('')
	const params = useParams()
	const INN = params!.INN as string 
	const ID_USER = params!.USER_ID as string// для route /[INN]/*
	const {dataGeo}=useGeo(ID_USER,PURPOSE_USE.redact,'добавил нового контрагента')

	if (focusForm !== 'CP' && focusForm !== 'DETAIL') {
		return <TitleFormTransform title='Контрагенты' onClick={() => setFocusForm('CP')} />
	}

	const handlerChange = (e: string) => {
		setPhoneValue(e)
	}
	
	const addNewCounterParty = async () => {
		setLoadForm(true)
		const dataNewCounterparty = await FetchCounterparty.createCounterparty(INN,{phone:phoneValue},dataGeo)
		setCounterparty((prev) =>[...prev,dataNewCounterparty])
		setSelectCounterpartyID(dataNewCounterparty._id)
		setLoadForm(false)
	}

	return (
		<motion.div
			className='bg-white rounded-xl shadow-lg p-6'
			animate={{
				x: focusForm === 'CP' ? -100 : 0,
				scaleX: focusForm === 'CP' ? 1.2 : 1,
				scaleY: focusForm === 'DETAIL' ? 0.8 : 1,
			}}
			transition={{ type: 'spring', stiffness: 300, damping: 30 }}
			onClick={() => setFocusForm('CP')}
		>
			<div>
				<p>Контрагенты</p>
				<div>
					{!selectedCounterpartyID && (
						<div>
							<AutoComplete
								onSelect={(_id) => setSelectCounterpartyID(_id)}
								showSearch={{
									filterOption: (inputValue, option) => {
										//TODO:
										console.log('🚀 ~ FormCounterparty ~ option:', option)
										console.log('🚀 ~ FormCounterparty ~ inputValue:', inputValue)
										return false
									},
								}}
								onChange={handlerChange}
								options={renderCounterpartyOption(counterparty)}
							>
								<Input placeholder='Тел' />
							</AutoComplete>
							<CusButton onClick={addNewCounterParty}>
								<FaPlus />
							</CusButton>
						</div>
					)}

					<form>
						<CusConfigProvider>
							тут форма 
						</CusConfigProvider>
					</form>
				</div>
			</div>
		</motion.div>
	)
}
