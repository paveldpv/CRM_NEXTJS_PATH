'use client'
import { FetchDetail } from '@/shared/api'
import ContextMenu from '@/shared/components/contextMenu/ui/ContextMenu' // Добавляем импорт
import CusAccordion from '@/shared/components/CusAccordion/CusAccordion'
import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import { TAssemblyDetailDTO, TBaseDetailDTO, TDetailDTO } from '@/shared/model/types'
import CusSpin from '@/shared/ui/loaders/CusSpin'
import { Collapse, Modal } from 'antd'
import { useParams } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { FaCubes, FaPlus } from 'react-icons/fa'
import { TFormDetails } from '../../model/Types'
import ListDetails from '../lists/ListDetails'
import HeaderDetails from '../simple/HeaderDetails'
import FormUpdateDetail from './FormUpdateDetail'

export default function FormDetails({ amountDetails, idOrder, permission, numberOrder }: TFormDetails) {
	const [details, setDetails] = useState<TDetailDTO[]>([])
	const [loader, setLoader] = useState(true)
	const [modalDetail, setModalDetail] = useState(false)
	const [redactDetail, setRedactDetail] = useState<TBaseDetailDTO | null>(null)

	const [redactAssemblyDetail, setRedactAssemblyDetail] = useState<TAssemblyDetailDTO | null>(null)
	const [modalAssemblyDetail, setModalAssemblyDetail] = useState(false)
	const params = useParams()
	const INN = params!.INN as string

	if (!idOrder) {
		return null
	}
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

	const addNewDetail = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		setRedactDetail(null)
		setModalDetail(true)
	}, [])

	const addNewSBDetail = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		// TODO: Реализовать логику для сборочной детали
		console.log('Добавить сборочную деталь')
		alert('Функция "Добавить сборочную деталь" в разработке')
	}, [])

	const itemsContextMenu = useMemo(
		() => [
			{
				title: 'Добавить деталь',
				onClickFunc: addNewDetail,
			},
			{
				title: 'Добавить сборочную деталь',
				onClickFunc: addNewSBDetail,
			},
		],
		[addNewDetail, addNewSBDetail],
	)

	return (
		<>
			<Fieldset legend={<FaCubes />} className=' row-span-2'>
				<CusAccordion onToggle={loadDetails}>
					<Collapse.Panel
						key='1'
						header={<HeaderDetails amountDetails={amountDetails} />}
						className=' flex  flex-col justify-start'
					>
						{loader ? (
							<CusSpin visible={loader} />
						) : (
							<div>
								<p>
									{permission && (
										<ContextMenu
											itemsMenu={itemsContextMenu}
											className='p-2 text-sm flex justify-center items-center'
										>
											<FaPlus />
											<p className='font-bold pl-2 pr-2'>Добавить</p>
										</ContextMenu>
									)}
								</p>
								{details.length !== 0 && (
									<ListDetails
									setLoader={setLoader}
										setDetails={setDetails}
										setRedactAssemblyDetail={setRedactAssemblyDetail}
										setModalAssemblyDetail={setModalAssemblyDetail}
										permission={permission}
										setModalDetail={setModalDetail}
										setRedactDetail={setRedactDetail}
										details={details}
									/>
								)}
							</div>
						)}
					</Collapse.Panel>
				</CusAccordion>
			</Fieldset>
			<Modal
				classNames={{ container: '!bg-transparent' }}
				open={modalDetail}
				onCancel={() => {
					setRedactDetail(null)
					setModalDetail(false)
				}}
				footer={null}
				width={800}
				styles={{
					container: {
						backgroundColor: 'transparent',
					},
				}}
			>
				<FormUpdateDetail
					setModalDetail={setModalDetail}
					setDetails={setDetails}
					setLoader={setLoader}
					redactDetail={redactDetail}
					idOrder={idOrder}
					numberOrder={numberOrder}
				/>
			</Modal>
		</>
	)
}
