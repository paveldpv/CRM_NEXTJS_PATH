'use client'
import { FetchDetail, FetchOrder } from '@/shared/api'
import { FetchAssemblyDetail } from '@/shared/api/detail/FetchAssemblyDeatail'
import CusAccordion from '@/shared/components/CusAccordion/CusAccordion'
import useGeo from '@/shared/model/hooks/useGeo'
import { PURPOSE_USE, TBaseDetailDTO } from '@/shared/model/types'
import CusButton from '@/shared/ui/button/ui/CusButton'
import CusSpin from '@/shared/ui/loaders/CusSpin'
import { Collapse, Tooltip } from 'antd'
import { format } from 'date-fns'
import { useParams, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { FaCheck, FaClock, FaPlus, FaSearch, FaTrash } from 'react-icons/fa'
import { TAssemblyDetailProps } from '../../../model/Types'
import ListComponentsAssemblyDetail from './ListComponentsAssemblyDetail'

export default function AssemblyDetail({
	detail,
	setDetails,
	setModalAssemblyDetail,
	setRedactAssemblyDetail,
	setModalDetail,
	setRedactDetail,
	permission,
	setLoader,
}: TAssemblyDetailProps) {
	const [componentsLoading, setComponentsLoading] = useState(false)
	const [components, setComponents] = useState<TBaseDetailDTO[]>([])
	const [accordionOpen, setAccordionOpen] = useState(false)

	const params = useParams()
	const INN = params!.INN as string
	const idUser = params!.USER_ID as string
	const { dataGeo } = useGeo(idUser, PURPOSE_USE.redact, 'удалил сборочную деталь')
	const searchParams = useSearchParams()

	const redactDetail = useCallback(() => {
		setRedactAssemblyDetail(detail)
		setModalAssemblyDetail(true)
	}, [detail, setRedactAssemblyDetail, setModalAssemblyDetail])

	const loadComponents = useCallback(async () => {
		if (!accordionOpen || components.length > 0) return
		setComponentsLoading(true)

		const getDataComponentsAssemblyDetail = await FetchDetail.getBaseDetailsByIDs(INN, detail.components)
		setComponents(getDataComponentsAssemblyDetail)
		setComponentsLoading(false)
	}, [accordionOpen, components.length, INN, detail.components])

	const removeDetailAssembly = useCallback(async () => {
		setLoader(true)
		const removeDetails = [detail._id, ...detail.components]
		await FetchDetail.removeBunchDetailsForOrder(INN, detail.order, removeDetails, dataGeo)
		await FetchDetail.removeDetailForOrder(INN,detail.order,detail._id,dataGeo)
		setDetails((prev) => prev.filter((el) => el._id !== detail._id))
		setLoader(false)
	}, [detail._id, detail.components, INN, detail.order, dataGeo, setLoader, setDetails])

	const handleAccordionToggle = useCallback(
		async (isOpen: string[]) => {
			const isNowOpen = isOpen.length > 0
			setAccordionOpen(isNowOpen)
			if (isNowOpen) {
				await loadComponents()
			}
		},
		[loadComponents],
	)

	const openRedactComponentDetail = useCallback(
		(component: TBaseDetailDTO) => {
			const params = new URLSearchParams(searchParams!.toString())
			params.set('idAssembly', detail._id)
			
			setRedactDetail(component)
			setModalDetail(true)
		},
		[searchParams, detail._id, setRedactDetail, setModalDetail],
	)

	const removeComponent = useCallback(
		async (componentId: string) => {
			setComponentsLoading(true)
			await Promise.all([
				FetchDetail.removeDetailForOrder(INN, detail.order, componentId, dataGeo),
				FetchAssemblyDetail.removeComponentAssemblyDetail(INN, detail._id, componentId, dataGeo),
			])
			setComponents((prev) => prev.filter((el) => el._id !== componentId))
			setComponentsLoading(false)
		},
		[INN, detail.order, detail._id, dataGeo, setComponents],
	)

	const onAddComponent = useCallback(() => {		
		setAccordionOpen(false)
		setRedactDetail(null)
		setModalDetail(true)
	}, [searchParams, detail._id, setRedactDetail, setModalDetail])

	return (
		<div className='p-4 bg-white rounded-lg shadow relative'>
			<div className='absolute top-2 right-2'>
				<span className='font-bold text-lg bg-blue-100 text-blue-800 px-2 py-1 rounded'>СБ</span>
			</div>

			<div className='grid grid-cols-12 gap-4 px-4 py-3 border-b hover:bg-gray-50'>
				<div className='col-span-3 font-medium'>
					<p className='p-2 flex justify-center'>{detail.nameDetail}</p>
					{permission && (
						<CusButton className='p-2' onClick={redactDetail}>
							<FaSearch />
						</CusButton>
					)}
				</div>
				<div className='col-span-2 text-center'>{format(new Date(detail.dateAddDetail), 'dd/MM/yy')}</div>
				<div className='col-span-1 text-center'>
					<span
						className={`px-2 py-1 text-xs rounded-full ${
							detail.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
						}`}
					>
						{detail.completed ? <FaCheck /> : <FaClock />}
					</span>
				</div>
				<div className='col-span-1 text-right font-medium'>{detail.amount}</div>
				<div className='col-span-1 text-right'>{detail.completedAmount}</div>
				<div className='col-span-2 truncate' title={detail.description?.join(', ')}>
					{detail.description?.slice(0, 1)}...
				</div>
				<div className='col-span-2 truncate' title={detail.propertyDetail?.join(', ')}>
					{detail.propertyDetail?.slice(0, 1)}...
				</div>
			</div>

			{/* Аккордеон с компонентами сборки */}
			<div className='mt-4'>
				<CusAccordion onToggle={handleAccordionToggle}>
					<Collapse.Panel
						key='components'
						header={
							<div className='flex justify-between items-center w-full'>
								<span>Компоненты сборки</span>
								<span>{detail.nameDetail}</span>
								<span className='text-sm text-gray-500'>({detail.components?.length || 0} деталей)</span>
							</div>
						}
					>
						{componentsLoading ? (
							<div className='py-4'>
								<CusSpin visible={true} />
							</div>
						) : (
							<div className='space-y-2'>
								{/* Кнопка добавления детали в сборку */}
								{permission && (
									<div className='mb-3'>
										<Tooltip title='Добавить деталь в сборку'>
											<CusButton className='p-2 flex items-center justify-center gap-2 w-full' onClick={onAddComponent}>
												<FaPlus />
												<span>Добавить деталь</span>
											</CusButton>
										</Tooltip>
									</div>
								)}

								<ListComponentsAssemblyDetail
									setComponents={setComponents}
									permission={permission}
									componentsAssemblyDetail={components}
									openRedactComponentDetail={openRedactComponentDetail}
									removeComponent={removeComponent}
								/>
							</div>
						)}
					</Collapse.Panel>
				</CusAccordion>
			</div>

			{/* Этапы */}
			{detail.step && detail.step.length > 0 && (
				<div className='mt-4 border-t pt-4'>
					<div className='grid grid-cols-12 gap-4 px-4 py-2 bg-gray-50 text-sm font-medium'>
						<div className='col-span-1'></div>
						<div className='col-span-8'>Этапы</div>
						<div className='col-span-3'>Статус</div>
					</div>
					{detail.step.map((step, idx) => (
						<div key={idx} className='grid grid-cols-12 gap-4 px-4 py-2 hover:bg-gray-50'>
							<div className='col-span-1 text-center'>
								<span className={`inline-block w-2 h-2 rounded-full ${step.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
							</div>
							<div className='col-span-8'>{step.name}</div>
							<div className='col-span-3'>{step.completed ? <FaCheck /> : <FaClock />}</div>
						</div>
					))}
				</div>
			)}

			{/* Кнопка удаления сборки */}
			{permission && (
				<div className='mt-4 flex justify-end'>
					<CusButton
						onClick={removeDetailAssembly}
						className='p-2 flex items-center gap-2 bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
					>
						<FaTrash />
						<span>Удалить сборку</span>
					</CusButton>
				</div>
			)}
		</div>
	)
}
