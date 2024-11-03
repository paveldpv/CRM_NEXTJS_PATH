'use client'
import { typeDialog, typicalError } from '@/Types/enums'
import { TWithoutPassUser } from '@/Types/Types'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { GoGraph } from 'react-icons/go'
import { MdDelete } from 'react-icons/md'
import { employeeImage } from '../../../config/urls'
import { useDialogWindow } from '../../../store/storeDialogWindow'
import { useInfoUser } from '../../../store/storeInfoUser'
import { TPanelRuleEmployee } from '../rulePanels/PanelRuleEmployee'
import CusButton from '../UI/CustomElements/CusButton'
import { fetchRemoveEmployee } from '../../../service/user/removeEmployee'
import { PURPOSE_USE, TGeoLocation } from '@/Types/subtypes/TGeoLocation'
import { redirect } from 'next/navigation'
import { useHelInformer } from '../../../store/storeHelpInformer'
import { fetchGetEmployee, TParamsAllEmployee } from '../../../service/user/getEmployee'
import { isError } from '../../../function/IsError'

type TItemEmployee = {
	index: number,
} & TWithoutPassUser &
	Omit<TPanelRuleEmployee, 'setVisibleAllEmployee'>

export default function ItemsEmployee({
	index,
	setVisibleCardEmployee,
	setRedactProfile,
	setVisibleLoader,
	setEmployee,
	
	...dataProfile
}: TItemEmployee) {
	const searchParams =useSearchParams()

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(data) => {
				const { latitude, longitude } = data.coords
				setDataGeo({
					location: {
						latitude,
						longitude,
					},
					idEmployee: idUser,
					process: PURPOSE_USE.redact,
				})
			},
			() => {
				redirect(`/ERROR/${typicalError.not_geo}`)
			}
		)
	}, [])

	const [dataGeo, setDataGeo] = useState<Omit<TGeoLocation, 'date'> | null>(null)
	const [setOpenDialogWindow, dispatchFn] = useDialogWindow((state) => [state.setOpen, state.setDispatchFn])
	
	const { PHONE } = useParams()
	const { linksAllowed, idUser, phone, INN } = useInfoUser((state) => state.dataUser)

	const permissionRedact = useMemo(() => {
		if (linksAllowed === 'ADMIN') {
			return true
		}
		const permission = linksAllowed.find((link) => link.href === 'employee' && !link.readonly)
		return !!permission
	}, [linksAllowed])

	const { push } = useRouter()

	const redactProfile = () => {
		setRedactProfile(dataProfile)
		setVisibleCardEmployee(true)
	}

	const goToStatistic = () => {
		push(`employee/${dataProfile.idUser}/statistic`)
	}

	const deletedEmployee = async () => {
		
		setOpenDialogWindow(
			true,
			{ title: 'удалить сотрудника ', message: `${dataProfile.surname} ${dataProfile.name}` },
			typeDialog.dialog
		)
		dispatchFn(async () => {
			setVisibleLoader(true)
			const {idUser}=dataProfile
			const response  =await fetchRemoveEmployee(INN,idUser,dataGeo!)
			if(response.status ===403){				
				setOpenDialogWindow(true,{title:'отказано в доступе'},typeDialog.error)
			}else if (response.status!==200){
				redirect(`/ERROR/${typicalError.error_DB}`)
			}else{
				const isListEmployeeWithDeleted = searchParams.get('all')===null?0:Number(searchParams.get('all')) as TParamsAllEmployee
				const updateListEmployee = await fetchGetEmployee(INN,isListEmployeeWithDeleted)
				if(isError(updateListEmployee)){
					redirect(`/ERROR/${typicalError.error_DB}`)
				}else{					
					setEmployee(updateListEmployee)
					setVisibleLoader(false)
				}

			}



		})
	}

	return (
		<div
			className={`${index % 2 === 0 ? ' bg-list_menu_even' : ' bg-list_menu'} ${
				dataProfile.phone === PHONE && 'border-2  border-solid  border-highlight_three'
			}  rounded-md m-1 grid grid-cols-4  align-middle p-1 `}
		>
			<section className=' col-span-2 grid grid-cols-8'>
				{dataProfile.srcPhoto === 'NOT_FOUND' ? (
					<Image src={employeeImage} alt={'no found'} height={50} width={50} className='rounded-xl col-span-1  ' />
				) : (
					<Image
						src={dataProfile.srcPhoto.FullPath}
						alt={'not found'}
						height={50}
						width={50}
						className=' rounded-xl  col-span-1'
					/>
				)}
				<ul className=' text-xs col-span-2'>
					<li>{dataProfile.surname}</li>
					<li>{dataProfile.name}</li>
					<li>{dataProfile.lastName}</li>
				</ul>
				<ul className='text-xs col-span-2'>
					<li>{dataProfile.phone}</li>
					<li className='flex items-baseline'>
						<sub>д.р.</sub>
						<p>{moment(dataProfile.dateBirthday).format('DD/MM/YY')}</p>
					</li>
					<li>{dataProfile.nameJobTitle || 'дол. не указана'}</li>
				</ul>
			</section>
			<section className=' col-span-2 text-xl m-2 flex gap-2'>
				{dataProfile.idUser === idUser ? (
					<CusButton>
						<Link href={`/${INN}/${phone}/main/setting/profile`}>
							<FaEdit />
						</Link>
					</CusButton>
				) : (
					<CusButton onClick={redactProfile} hidden={!permissionRedact}>
						<FaEdit />
					</CusButton>
				)}
				<CusButton onClick={goToStatistic}>
					<GoGraph />
				</CusButton>
				<CusButton onClick={deletedEmployee} hidden={dataProfile.linksAllowed == 'ADMIN' && permissionRedact}>
					<MdDelete />
				</CusButton>
			</section>
			<section className=' col-span-1'></section>
		</div>
	)
}
