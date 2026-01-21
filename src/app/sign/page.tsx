
import Auth from '@/entities/auth/ui/Auth'
import DialogWindow from '@/shared/ui/dialogWindow/ui/DialogWindow'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'авторизация',
	description: 'sign MES',
}

export default function auth() {
	return (
		<>
			<Auth />
			<DialogWindow />
		</>
	)
}
