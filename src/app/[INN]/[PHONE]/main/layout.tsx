import StaticLoader from '@/shared/ui/loaders/staticLoaders/StaticLoader'
import Header from '@/widgets/header/ui/Header'

import NavBar from '@/widgets/navBar/ui/NavBar'

import { Suspense } from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className=' w-full h-screen  flex flex-col overflow-hidden '>
			<Suspense
				fallback={
					<div className=' w-full h-24 border-2 flex justify-center items-center'>
						<span className='Mini_Loader'></span>
					</div>
				}
			>
				<Header />
			</Suspense>

			<div className=' flex h-full overflow-auto  '>
				<Suspense
					fallback={
						<div className=' flex justify-center items-center'>
							<StaticLoader />
						</div>
					}
				>
					<div className=' sticky top-0'>
						<NavBar />
					</div>
					<div className=' p-4 w-full'>{children}</div>
				</Suspense>
			</div>
		</div>
	)
}
