'use client'
import { FaCalendarAlt, FaCircleNotch, FaCubes } from 'react-icons/fa'
import { TListDetails } from '../../model/Types'
import Detail from '../simple/Detail'

export default function ListDetails({ setRedactDetail, permission, setModalDetail, details }: TListDetails) {
	return (
		<div>
			{details.length === 0 ? (
				<p className=' text-xs m-2  underline'>Нет деталей в заказе</p>
			) : (
				<div>
					<div className='grid grid-cols-12 gap-4 mb-2 px-4 py-2 bg-gray-100 rounded-t-lg font-medium text-gray-700'>
						<div className='col-span-3'>Наименование</div>
						<div className='col-span-2 text-center'>
							<FaCalendarAlt />
						</div>
						<div className='col-span-1 text-center'>
							<FaCircleNotch />
						</div>
						<div className='col-span-1 text-right'>
							<FaCubes />
						</div>
						<div className='col-span-1 text-right'>Выполнено</div>
						<div className='col-span-2'>Описание</div>
						<div className='col-span-2'>Свойства</div>
					</div>
					{details.map((detail) => (
						<div>
							<Detail
								key={detail._id}
								permission
								detail={detail}
								setModalDetail={setModalDetail}
								setRedactDetail={setRedactDetail}
							/>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
