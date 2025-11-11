'use client'
import { isError } from '@/shared/lib/IsError'
import { useConfigApp } from '@/shared/model/store/storeConfigApp'
import { useInfoUser } from '@/shared/model/store/storeInfoUser'
import { TWithoutPassUser } from '@/shared/model/types/subtypes/Types'
import CusButton from '@/shared/ui/CusButton'
import { TextField } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, Dispatch, SetStateAction, useMemo } from 'react'
import { IoPersonAdd } from 'react-icons/io5'
import { styleTextFiled } from '../../../../config/muiCustomStyle/textField'
import { fetchGetEmployee } from '../api/getEmployee'

export type TPanelRuleEmployee = {
	setVisibleCardEmployee: (state: boolean) => void
	setRedactProfile: (state: null | TWithoutPassUser) => void

	setEmployee: Dispatch<SetStateAction<[] | TWithoutPassUser[]>>
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

	const { linksAllowed, INN } = useInfoUser((state) => state.dataUser)
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

	const changeVisibleAllEmployee = async (e: ChangeEvent<HTMLInputElement>) => {
		setVisibleLoader(true)
		const value = e.target.checked
		const current = new URLSearchParams(Array.from(searchParams!.entries()))
		value ? current.set('all', '1') : current.set('all', '0')
		const search = current.toString()
		const query = search ? `?${search}` : ''
		router.push(`${pathname}${query}`)

		const updateListEmployee = await fetchGetEmployee(INN, value ? 1 : 0)
		if (isError(updateListEmployee)) {
			redirect(`/ERROR/${updateListEmployee.typeError}`)
		} else {
			setEmployee(updateListEmployee)
			setVisibleLoader(false)
		}
	}

	const searchEmployee = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
		<div className=' flex gap-4 border-b-2 pb-2 py-2  sticky top-0  overflow-hidden w-full  bg-white  z-50  '>
			<CusButton className=' text-2xl  ' disabled={!permissionRedact} onClick={addNewEmployee}>
				<IoPersonAdd />
			</CusButton>
			<section style={{ borderColor: configMain?.color.borderColor }} className=' flex gap-5  items-baseline'>
				<div style={{ borderColor: configMain?.color.borderColor }} className=' border-2 border-solid pr-2 pl-2 rounded-md '>
					<label htmlFor='' className=' text-xs'>
						показать всех
					</label>
					<Checkbox {...styleTextFiled} onChange={changeVisibleAllEmployee} />
				</div>

				<TextField {...styleTextFiled} onChange={searchEmployee} label='поиск' placeholder='тел|имя|фамилия' />
			</section>
		</div>
	)
}
