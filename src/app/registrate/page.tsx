
import FormRegistrate from '@/entities/registrated/ui/FormRegistrate'
import DialogWindow from '@/shared/ui/DialogWindow'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Registrate',
	description: 'create new MES user (admin user)',
}

export default function page() {
	return (
		<>
			<FormRegistrate />
			<DialogWindow />
		</>
	)
}
