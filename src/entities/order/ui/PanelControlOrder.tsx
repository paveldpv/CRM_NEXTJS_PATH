import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import CusButton from '@/shared/ui/button/ui/CusButton'
import { Button, Input } from 'antd'
import { FaList, FaPlus, FaSearch, FaTh, FaTools } from 'react-icons/fa'
import { TRulePanelOrder } from '../model/Type'
import { useCallback, useState } from 'react'

export default function PanelControlOrder(data: TRulePanelOrder) {
	const [valueSearch,setValueSearch]=useState('')
	const  handlerSearch =useCallback(async()=>{
		if(!valueSearch)return
		
	},[])
	return (
		<Fieldset legend={<FaTools />} className=' row-span-1 w-14'>
			<ul>
				<li className='border-l-2'>
					<CusButton>
						<FaPlus />
					</CusButton>
				</li>
				<li>
					<div className='flex'>
						<Input
							placeholder='Поиск...'
							value={valueSearch}
							onChange={e=>setValueSearch(e.target.value)}
							prefix={<FaSearch />}
							className='w-64 rounded-r-none'
							onPressEnter={handlerSearch}
						/>
						<Button type='primary' icon={<FaSearch />} onClick={handlerSearch} className='rounded-l-none' />
					</div>
				</li>
				<li>
					<Button className=' rounded-r-sm'>
						<FaList />
					</Button>
					<Button className=' rounded-l-sm'>
						<FaTh />
					</Button>
				</li>
			</ul>
		</Fieldset>
	)
}
