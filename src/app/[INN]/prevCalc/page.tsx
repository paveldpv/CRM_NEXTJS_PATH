import FormPrevCalc from '@/entities/prevCalc/ui/FormPrevCalc'
import DialogWindow from '@/shared/ui/DialogWindow'
import ProgressLoader from '@/shared/ui/ProgressLoader/ui/ProgressLoader'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'предварительный расчет',
	description: '',
}

export default function page({ params }: { params: { INN: string } }) {
	const INN = Number(params.INN)

	return (
		<>
			<FormPrevCalc INN={INN} />
			<ProgressLoader />
			<DialogWindow />
		</>
	)
}
