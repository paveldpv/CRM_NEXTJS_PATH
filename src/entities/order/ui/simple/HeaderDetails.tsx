'use client'
export default function HeaderDetails({amountDetails}:{amountDetails:number}) {
	if(amountDetails==0){
		return <p className=' text-sm m-2 underline text-left'>Нет деталей в заказе</p>
	}
	return (
		<p>Детали в заказе : {amountDetails}</p>
	)
}