export function maskPhoneNumber(phone?: string): string {
	if(!phone){
		return '+7(●●●)●●●-●●-●●'
	}
	const digits = phone.replace(/\D/g, '')

	if (digits.length !== 11) {
		return '+7(●●●)●●●-●●-●●'
	}

	const countryCode = '+7'
	const firstPart = '***'
	const secondPart = '***'
	const lastTwo1 = digits.slice(-4, -2)
	const lastTwo2 = digits.slice(-2)

	// 4. Собираем в нужном формате
	return `${countryCode}(${firstPart})${secondPart}-${lastTwo1}-${lastTwo2}`
}

export function formatPhoneNumber(phone: string): string {
  
  const digits = phone.replace(/\D/g, '')
  
  
  if (digits.length !== 11) {
    return phone 
  }
  
  
  const countryCode = '+7'
  const operatorCode = digits.slice(1, 4) // 910
  const firstPart = digits.slice(4, 7)    // 629
  const secondPart = digits.slice(7, 9)   // 25
  const thirdPart = digits.slice(9)       // 50
  
  
  return `${countryCode}(${operatorCode})${firstPart}-${secondPart}-${thirdPart}`
}