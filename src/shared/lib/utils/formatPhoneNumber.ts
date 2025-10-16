function formatPhoneNumber(phone: string): string {
	const cleaned = phone.replace(/\D/g, '')

	let formatted = cleaned.startsWith('8') ? '7' + cleaned.slice(1) : cleaned

	if (formatted.length === 11) {
		return `+7(${formatted.slice(1, 4)})${formatted.slice(4, 7)}-${formatted.slice(
			7,
			9
		)}-${formatted.slice(9)}`
	}

	return phone
}
