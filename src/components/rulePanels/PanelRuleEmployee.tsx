'use client'
import { TWithoutPassUser } from '@/Types/Types'
import Checkbox from '@mui/material/Checkbox'
import { redirect, usePathname, useRouter } from 'next/navigation'
import { ChangeEvent, Dispatch, SetStateAction, useMemo } from 'react'
import { IoPersonAdd } from 'react-icons/io5'
import { styleTextFiled } from '../../../config/muiCustomStyle/textField'
import { isError } from '../../../function/IsError'
import { fetchGetEmployee, TParamsAllEmployee } from '../../../service/user/getEmployee'
import { useConfigApp } from '../../../store/storeConfigApp'
import { useInfoUser } from '../../../store/storeInfoUser'
import CusButton from '../UI/CustomElements/CusButton'
import { useSearchParams } from 'next/navigation'

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
	const router = useRouter();
  const pathname = usePathname();
 
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
		const current = new URLSearchParams(Array.from(searchParams.entries()))
		value? current.set("all","1" ):current.set("all","0")
		const search = current.toString()
		const query = search ? `?${search}` : ""
		router.push(`${pathname}${query}`)

		// setVisibleAllEmployee(value ? 1 : 0)
		const updateListEmployee = await fetchGetEmployee(INN, value ? 1 : 0)
		if (isError(updateListEmployee)) {
			redirect(`/ERROR/${updateListEmployee.typeError}`)
		} else {
			setEmployee(updateListEmployee)
			setVisibleLoader(false)
		}
	}

	return (
		<div style={{ borderColor: configMain?.color.borderColor }} className=' mb-2 flex gap-4 border-b-2 pb-2'>
			<CusButton className=' text-2xl ' disabled={!permissionRedact} onClick={addNewEmployee}>
				<IoPersonAdd />
			</CusButton>
			<div
				style={{ borderColor: configMain?.color.borderColor }}
				className=' border-2 border-solid pr-2 pl-2 rounded-md'
			>
				<label htmlFor='' className=' text-xs'>
					показать всех
				</label>
				<Checkbox {...styleTextFiled} onChange={changeVisibleAllEmployee} />
			</div>
		</div>
	)
}
