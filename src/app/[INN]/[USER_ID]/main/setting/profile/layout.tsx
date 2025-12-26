
import PrevLoaderProfile from '@/entities/userProfile/ui/PrevLoaderProfile'
import type { Metadata } from 'next'
import React, { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Профиль',
	description: 'Настройки профиля',
}

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Suspense fallback={<PrevLoaderProfile />}>{children}</Suspense>
		</>
	)
}
