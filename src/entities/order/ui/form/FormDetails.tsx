'use client'
import { FetchDetail } from '@/shared/api'
import CusAccordion from '@/shared/components/CusAccordion/CusAccordion'
import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import { TDetailDTO } from '@/shared/model/types'
import CusButton from '@/shared/ui/button/ui/CusButton'
import CusSpin from '@/shared/ui/loaders/CusSpin'
import { Collapse, Modal } from 'antd'
import { useParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { FaCubes, FaPlus } from 'react-icons/fa'
import { TFormDetails } from '../../model/Types'
import ListDetails from '../lists/ListDetails'
import HeaderDetails from '../simple/HeaderDetails'
import FormUpdateDetail from './FormUpdateDetail'

export default function FormDetails({ amountDetails, idOrder, permission }: TFormDetails) {
	const [details, setDetails] = useState<TDetailDTO[]>([])
	const [loader, setLoader] = useState(true)
	const [modalDetail, setModalDetail] = useState(false)
	const [redactDetail, setRedactDetail] = useState<TDetailDTO | null>(null)
	const params = useParams()
	const INN = params!.INN as string

	const loadDetails = async () => {
		if (!idOrder) {
			setLoader(false)
			return
		}
		setLoader(true)
		const dataDetails = await FetchDetail.getDetailByIdOrder(INN, idOrder)
		setDetails(dataDetails)
		setLoader(false)
	}
	const addNewDetail = useCallback(() => {		
		setRedactDetail(null)
		setModalDetail(true)
	}, [])

	return (
		<>
			<Fieldset legend={<FaCubes />} className=' row-span-2'>
				<CusAccordion onToggle={loadDetails}>
					<Collapse.Panel key='1' header={<HeaderDetails amountDetails={amountDetails} />} className=' flex  justify-center'>
						{loader ? (
							<CusSpin visible={loader} />
						) : (
							<>
								<p>
									{permission && (
										<CusButton className='p-2 text-sm w-9' onClick={addNewDetail}>
											<FaPlus />
											<p className=' font-bold pl-2 pr-2'>Добавить</p>
										</CusButton>
									)}
								</p>
								<ListDetails
									permission={permission}
									setModalDetail={setModalDetail}
									setRedactDetail={setRedactDetail}
									details={details}
								/>
							</>
						)}
					</Collapse.Panel>
				</CusAccordion>
			</Fieldset>
			<Modal
				open={modalDetail}
				onCancel={() => {
					setRedactDetail(null)
					setModalDetail(false)
				}}
			>
				<FormUpdateDetail
					setModalDetail={setModalDetail}
					setDetails={setDetails}
					setLoader={setLoader}
					redactDetail={redactDetail}
				/>
			</Modal>
		</>
	)
}
