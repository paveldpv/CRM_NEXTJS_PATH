import { FaCalendarAlt, FaCircleNotch, FaCubes } from 'react-icons/fa'

export default function HeaderLIstDetails() {
	return (
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
	)
}
