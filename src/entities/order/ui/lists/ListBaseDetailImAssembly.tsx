import CusAccordion from '@/shared/components/CusAccordion/CusAccordion'
import CusButton from '@/shared/ui/button/ui/CusButton'
import CusSpin from '@/shared/ui/loaders/CusSpin'
import { Collapse, Tooltip } from 'antd'
import { FaImage, FaInfo } from 'react-icons/fa'
import { TListBaseDetailImAssembly } from '../../model/Types'



export default function ListBaseDetailImAssembly({
	redactAssemblyDetail,
	loadComponents,
	loaderComponents,
	addBaseDetailFromAssembly,
	componentsBaseDetail,
	redactComponentDetail,
}: TListBaseDetailImAssembly) {
	return (
		<CusAccordion onToggle={loadComponents}>
			<Collapse.Panel
				key='components'
				header={
					<div className='flex justify-between items-center w-full'>
						{redactAssemblyDetail.components.length > 0 ? (
							<label className='text-xs font-bold'>
								Сборка состоит из :{redactAssemblyDetail.components.length} деталей
							</label>
						) : (
							<label className='text-xs font-bold'>Нет деталей в сборке</label>
						)}
					</div>
				}
			>
				<div className='flex flex-col gap-1'>
					{loaderComponents ? (
						<CusSpin />
					) : (
						<>
							<CusButton
								type='button'
								className='flex items-center justify-center gap-2'
								onClick={addBaseDetailFromAssembly}
							>
								<Tooltip title={'добавить базовую деталь к сборке'}>
									<FaImage />
								</Tooltip>
							</CusButton>
							{redactAssemblyDetail.components.length > 0 && componentsBaseDetail.length == 0 && (
								<ul>
									{componentsBaseDetail.map((el) => (
										<li key={el._id} className=' flex justify-between border-b-2 border-dashed border-black'  >
											{el.nameDetail} в количестве : {el.amount}шт.
											<CusButton onClick={() => redactComponentDetail(el)}>
												<FaInfo />
											</CusButton>
										</li>
									))}
								</ul>
							)}
						</>
					)}
				</div>
			</Collapse.Panel>
		</CusAccordion>
	)
}
