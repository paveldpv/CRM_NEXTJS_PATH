import { TListComponentsAssemblyDetail } from '@/entities/order/model/Types'
import CusButton from '@/shared/ui/button/ui/CusButton'
import { FaSearch, FaTimes } from 'react-icons/fa'

export default function ListComponentsAssemblyDetail({
	componentsAssemblyDetail,
	permission,
	openRedactComponentDetail,
	removeComponent,
}: TListComponentsAssemblyDetail) {
	if (componentsAssemblyDetail.length === 0) {
		return (
			<div className='text-center py-4 text-gray-500'>
				{componentsAssemblyDetail?.length === 0 ? 'В сборке нет деталей' : 'Детали не загружены'}
			</div>
		)
	}

	return (
		<div className='space-y-2'>
			{componentsAssemblyDetail.map((component) => (
				<div key={component._id} className='flex items-center justify-between p-3 border rounded hover:bg-gray-50'>
					<div className='flex items-center gap-3'>
						<CusButton className='p-2' onClick={() => openRedactComponentDetail(component)}>
							<FaSearch />
						</CusButton>
						<ul className='flex justify-between w-full'>
							<li className='text-sm w-1/2'>{component.nameDetail}</li>
							<li className='text-sm text-right w-1/2'>
								всего деталей/завершены
								<p className='text-gray-400 inline-block mx-1'>{component.amount}</p>
								<p className='text-green-400 inline-block'>{component.completedAmount}</p>
							</li>
						</ul>
					</div>

					{permission && (
						<CusButton className='p-2 text-red-500 hover:text-red-700' onClick={() => removeComponent(component._id)}>
							<FaTimes />
						</CusButton>
					)}
				</div>
			))}
		</div>
	)
}
