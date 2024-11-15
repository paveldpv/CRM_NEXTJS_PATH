import moment from 'moment'
import Image from 'next/image'

import { TListEntryPointsLocation } from '@/app/[INN]/[PHONE]/main/setting/historyEntryLocation/[...FILTER]/page'
import { mapCity } from '../../../../config/urls'
import { processEntry } from '../model/processEntry'

export default function ListEntryPointsLocation({
	dataEntryUsers,
}: Omit<TListEntryPointsLocation, 'listEmployee'>) {
	
	return (
		<div>
			{dataEntryUsers.map((personalData, index) => {
				return (
					<ul key={index} className='grid     grid-cols-4 gap-2 mt-2'>
						<li>
							<ul className=' itemList '>
								<li>{personalData.name}</li>
								<li>{personalData.surname}</li>
								<li>{personalData.lastName}</li>
							</ul>
						</li>
						<li
							style={{ background: `${processEntry[personalData.process].bgColor}` }}
							className={`itemList flex items-center justify-center`}
						>
							{processEntry[personalData.process].title}
						</li>
						<li>
							<a
								className=' overflow-hidden itemList  flex items-center justify-center   hover:bg-color_header  delay-100  duration-300 '
								href={`https://www.openstreetmap.org/#map=18/${personalData.location.latitude}/${personalData.location.longitude}`}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									style={{ objectFit: 'cover', height: '60px' }}
									className=' rounded-md '
									src={mapCity}
									alt={'местоположение'}
									loading='lazy'
									height={60}
									width={370}
								/>
							</a>
						</li>

						<li className=' itemList flex justify-center items-center'>
							{moment(personalData.date).format('DD - MM - YYYY')}
						</li>
					</ul>
				)
			})}
		</div>
	)
}
