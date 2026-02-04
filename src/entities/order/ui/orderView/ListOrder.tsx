'use client'
import { TListOrder } from '../../model/Type'

export default function ListOrder({dataOrder,viewMode,permission,setOpenForm,setSelectedOrder}:TListOrder) {
	if(dataOrder.length===0){
		return <div className=' row-span-2 text-2xl'>Нет заказов</div>
	}
	return <div className=' row-span-2'>ListOrder</div>
	//TODO:
}
