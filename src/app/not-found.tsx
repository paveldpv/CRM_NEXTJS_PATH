import ERROR_PAGE from '@/feature/errors/ui/ERROR_PAGE'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Страница не найдена',
	description: 'произошла ошибка',
}

export default async function NotFound() {
	return <ERROR_PAGE />
}
