export const formattingPriceCell = (price: string) =>{
	if(!Number(price))return price.trim()
	return	new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(+price)
}

