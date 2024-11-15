import StaticLoader from '@/shared/ui/loaders/staticLoaders/StaticLoader'
import { Suspense } from 'react'
export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Suspense
				fallback={
					<div className=' flex justify-center items-center'>
						<StaticLoader />
					</div>
				}
			>
				{children}
			</Suspense>
		</>
	)
}
