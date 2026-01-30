'use client'
import { isError } from '@/shared/lib/IsError'
import { useConfigApp } from '@/shared/model/store/storeConfigApp'
import { useInfoUser } from '@/shared/model/store/storeInfoUser'

import { Input, Checkbox } from 'antd'
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, Dispatch, SetStateAction, useMemo } from 'react'
import { IoPersonAdd } from 'react-icons/io5'


import { TUserDTOWithoutPas } from '@/shared/model/types'
import CusButton from '@/shared/ui/button/ui/CusButton'

export type TPanelRuleEmployee = {
	setVisibleCardEmployee: (state: boolean) => void
	setRedactProfile: (state: null | TUserDTOWithoutPas ) => void
	setEmployee: Dispatch<SetStateAction<[] | TUserDTOWithoutPas []>>
	setVisibleLoader: Dispatch<SetStateAction<boolean>>
}

export default function PanelRuleEmployee({
	setVisibleCardEmployee,
	setRedactProfile,
	setEmployee,
	setVisibleLoader,
}: TPanelRuleEmployee) {
	const searchParams = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()

	const { configMain } = useConfigApp((state) => state.dataConfigApp)

	const { linksAllowed , INN } = useInfoUser((state) => state.dataUser!)

	const permissionRedact = useMemo(() => {
		if (linksAllowed === 'ADMIN') {
			return true
		}
		const permission = linksAllowed.find((link) => link.href === 'employee' && !link.readonly)
		return !!permission
	}, [linksAllowed])

	const addNewEmployee = () => {
		setVisibleCardEmployee(true)
		setRedactProfile(null)
	}

	const changeVisibleAllEmployee = async (e: any) => {
		setVisibleLoader(true)
		const value = e.target.checked
		const current = new URLSearchParams(Array.from(searchParams!.entries()))
		value ? current.set('all', '1') : current.set('all', '0')
		const search = current.toString()
		const query = search ? `?${search}` : ''
		router.push(`${pathname}${query}`)
		//TODO:
		setVisibleLoader(false)

		
	}

	const searchEmployee = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		const regex = new RegExp(value)
		setEmployee((employees) => {
			return employees.filter(
				(empl) =>
					regex.test(empl.phone) ||
					(empl.name && regex.test(empl.name)) ||
					(empl.surname && regex.test(empl.surname)) ||
					(empl.lastName && regex.test(empl.lastName))
			)
		})
	}

	return (
		<div className='flex gap-4 border-b-2 pb-2 py-2 sticky top-0 overflow-hidden w-full bg-white z-50'>
			<CusButton className='text-2xl' disabled={!permissionRedact} onClick={addNewEmployee}>
				<IoPersonAdd />
			</CusButton>
			<section 
				style={{ borderColor: configMain?.color.borderColor }} 
				className='flex gap-5 items-baseline'
			>
				<div 
					style={{ borderColor: configMain?.color.borderColor }} 
					className='border-2 border-solid pr-2 pl-2 rounded-md flex items-center gap-2'
				>
					<label htmlFor='showAllCheckbox' className='text-xs whitespace-nowrap'>
						показать всех
					</label>
					<Checkbox 
						id='showAllCheckbox'
						onChange={changeVisibleAllEmployee}
						className='m-0 p-0'
					/>
				</div>

				<Input
					placeholder='тел|имя|фамилия'
					onChange={searchEmployee}
					className='w-64'
					allowClear
				/>
			</section>
		</div>
	)
}