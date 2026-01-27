
import FormRegistrate from '@/entities/registrated/ui/FormRegistrate'
import DialogWindow from '@/shared/ui/dialogWindow/ui/DialogWindow'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Регистрация',
	description: 'Создание нового пользователя',
}

export default function page() {
	return (
		<>
			<FormRegistrate />
			<DialogWindow />
		</>
	)
}
 