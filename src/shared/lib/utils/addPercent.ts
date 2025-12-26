export const addPercent = (value: string, percent: number) => {
	if (!Number(value)) return value

	return (+value + (+value * percent) / 100).toFixed(2)
}
