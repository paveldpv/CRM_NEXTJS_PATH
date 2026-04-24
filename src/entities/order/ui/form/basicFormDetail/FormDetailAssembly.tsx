'use client'

import { Tooltip } from 'antd'
import { FaQuestion } from 'react-icons/fa'

import { TAssemblyDetailDTO, TBaseDetailDTO } from '@/shared/model/types'
import ListBaseDetailImAssembly from '../../lists/ListBaseDetailImAssembly'
import { TListBaseDetailImAssembly } from '@/entities/order/model/Types'



export default function FormDetailAssembly({
	redactAssemblyDetail,
	loadComponents,
	loaderComponents,
	addBaseDetailFromAssembly,
	componentsBaseDetail,
	redactComponentDetail,
}: TListBaseDetailImAssembly) {
	return (
		<div className='grid grid-cols-2 gap-4 mt-4'>
			{redactAssemblyDetail?._id ? (
				<ListBaseDetailImAssembly
					redactAssemblyDetail={redactAssemblyDetail}
					loadComponents={loadComponents}
					loaderComponents={loaderComponents}
					addBaseDetailFromAssembly={addBaseDetailFromAssembly}
					componentsBaseDetail={componentsBaseDetail}
					redactComponentDetail={redactComponentDetail}
				/>
			) : (
				<div className='flex flex-col justify-center items-center gap-1'>
					<label>
						<Tooltip title='Чтобы добавить составные компоненты — сохраните сборку'>
							<FaQuestion />
						</Tooltip>
					</label>
				</div>
			)}
		</div>
	)
}
