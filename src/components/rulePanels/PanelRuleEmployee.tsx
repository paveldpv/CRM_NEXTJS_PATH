'use client'
import Checkbox from '@mui/material/Checkbox'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { IoPersonAdd } from 'react-icons/io5'
import { styleTextFiled } from '../../../config/muiCustomStyle/textField'
import { useConfigApp } from '../../../store/storeConfigApp'
import { useInfoUser } from '../../../store/storeInfoUser'
import { TDBUser, TWithoutPassUser } from '@/Types/Types'

export type TPanelRuleEmployee ={
	setVisibleCardEmployee:(state:boolean)=>void
	setRedactProfile:(state:null|TWithoutPassUser)=>void
}

export default function PanelRuleEmployee({setVisibleCardEmployee,setRedactProfile}:TPanelRuleEmployee) {
	const { configMain } = useConfigApp((state) => state.dataConfigApp)
	const router = useRouter()
	const { linksAllowed } = useInfoUser((state) => state.dataUser)
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

	return (
		<div style={{ borderColor: configMain?.color.borderColor }} className=' mb-2 flex gap-4 border-b-2 pb-2'>
			<button
				style={{ borderColor: configMain?.color.borderColor }}
				className=' text-2xl '
				disabled={!permissionRedact}
				onClick={addNewEmployee}
			>
				<IoPersonAdd />
			</button>
			<div
				style={{ borderColor: configMain?.color.borderColor }}
				className=' border-2 border-solid pr-2 pl-2 rounded-md'
			>
				<label htmlFor='' className=' text-xs'>					
					показать всех
				</label>
				<Checkbox {...styleTextFiled} />
			</div>
		</div>
	)
}
