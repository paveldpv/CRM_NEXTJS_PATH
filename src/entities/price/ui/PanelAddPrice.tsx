'use client'
import { isError } from '@/shared/lib/IsError'
import { useFieldDialog } from '@/shared/model/store/storeFiledDialog'
import { useInfoUser } from '@/shared/model/store/storeInfoUser'
import { useLoader } from '@/shared/model/store/storeLoader'
import { typicalError } from '@/shared/model/types/enums'
import { PURPOSE_USE, TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { TLink } from '@/shared/model/types/Types'
import CusButton from '@/shared/ui/CusButton'
import { redirect } from 'next/navigation'
import { memo } from 'react'
import { FaPlus } from 'react-icons/fa'
import { fetchAddNewPrice } from '../api/addNewPrice'

function PanelAddPrice({ INN, listLinks }: { INN: string; listLinks: TLink[] }) {
	if (listLinks?.length > 10) {
		return <></>
	}
	const setOpenFieldDialog = useFieldDialog((state) => state.setOpen)
	const setVisibleLoader = useLoader((state) => state.setVisibleLoader)
	const { idUser } = useInfoUser((state) => state.dataUser)

	const submitNewPrice = async (nameNewPrice?: string) => {
		if (!nameNewPrice) return
		setVisibleLoader(true)
		navigator.geolocation.getCurrentPosition(
			async (dataPos) => {
				const { latitude, longitude } = dataPos.coords
				const dataGeo: Omit<TGeoLocation, 'date'> = {
					location: {
						latitude,
						longitude,
					},
					process: PURPOSE_USE.redact,
					idEmployee: idUser,
				}
				const addNewPrice = await fetchAddNewPrice(INN, nameNewPrice, dataGeo)
				if (addNewPrice.status !== 200 || isError(addNewPrice.response)) {
					console.log(addNewPrice);
					
					redirect(`/ERROR/${typicalError.error_DB}`)
				} else {
					setVisibleLoader(false)
					redirect(`/main/price/${addNewPrice}`)
				}
			},
			(erGeo) => {
				redirect(`/ERROR/${typicalError.not_geo}`)
			}
		)
	}

	

	return (
		<>
			<div>
				<CusButton onClick={()=>{
					setOpenFieldDialog({
						state: true,
						dispatchFn: submitNewPrice,
						dataDialog: { title: 'Название новой таблицы' },
					})
				}} className='p-3'>
					<FaPlus />
				</CusButton>
			</div>
		</>
	)
}
export default memo(PanelAddPrice)
