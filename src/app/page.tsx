import Image from 'next/image'
import Link from 'next/link'
export const revalidate = 0
export default function page() {
  
	return (
		<div className='flex flex-col '>
			<div className=''>
				<Image src='/LOGO_FACTORY.png' alt='CRM Logo' width={400} height={50} />
			</div>
			<ul className='   bg-color_header p-9 rounded-md  flex flex-col gap-4  text-md '>
				<li>
					<Link className='labelForInput w-1/2 ' href={'/sign'}>
						Войти
					</Link>
				</li>
				<hr />
				<li>
					<Link className='labelForInput' href={'/registrate'}>
						Регистрация
					</Link>
				</li>
			</ul>
		</div>
	)
}
