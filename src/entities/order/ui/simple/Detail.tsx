'use client'
import { FetchDetail } from '@/shared/api'
import useGeo from '@/shared/model/hooks/useGeo'
import { PURPOSE_USE } from '@/shared/model/types'
import CusButton from '@/shared/ui/button/ui/CusButton'
import { format } from 'date-fns'
import { useParams } from 'next/navigation'
import { FaCheck, FaClock, FaSearch, FaTimes } from 'react-icons/fa'
import { TDetail } from '../../model/Types'

export default function Detail({ setLoader, setDetails, detail, setRedactDetail, setModalDetail, permission }: TDetail) {
	const params = useParams()
	const INN = params!.INN as string
	const idUser = params!.USER_ID as string
	const { dataGeo } = useGeo(idUser, PURPOSE_USE.redact, 'удалил деталь')

	const redactDetail = () => {
		setRedactDetail(detail)
		setModalDetail(true)
	}
	const removeDetail = async () => {
		setLoader(true)
		await FetchDetail.removeDetailForOrder(INN, detail.order, detail._id, dataGeo)
		setDetails((prev) => prev.filter((el) => el._id != detail._id))
		setLoader(false)
	}
	return (
		<div className='p-4 bg-white rounded-lg shadow'>
			<div className='grid grid-cols-12 gap-4 px-4 py-3 border-b hover:bg-gray-50'>
				<div className='col-span-3 font-medium'>
					<p className='p-2 flex justify-center'>{detail.nameDetail}</p>
					{permission && (
						<CusButton className='p-2' onClick={redactDetail}>
							<FaSearch />
						</CusButton>
					)}
				</div>
				<div className='col-span-2 text-center'>{format(new Date(detail.dateAddDetail), 'DD/MM/yy')}</div>
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
			<div>
				<CusButton onClick={removeDetail}>
					<FaTimes />
				</CusButton>
			</div>
		</div>
	)
}
