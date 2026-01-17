import { BiMessageAdd } from 'react-icons/bi'
import { BsCashCoin, BsFillFileEarmarkPersonFill } from 'react-icons/bs'
import { FaBook, FaDrawPolygon, FaShippingFast, FaTable } from 'react-icons/fa'
import { GoGraph } from 'react-icons/go'
import { IoIosSettings } from 'react-icons/io'
import { LiaTasksSolid } from 'react-icons/lia'
import { MdOutlinePriceChange } from 'react-icons/md'
import { PiSignOutBold } from 'react-icons/pi'

import { TLink } from '@/shared/model/types/subtypes/Types'
import { BsGeoAlt } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { MdDisplaySettings, MdSettings } from 'react-icons/md'

const mapIconsNavLink = {
	order: <FaBook />, 
	payment: <BsCashCoin />,
	shipment: <FaShippingFast />,
	employee: <BsFillFileEarmarkPersonFill />,
	tasks: <LiaTasksSolid />,
	application: <BiMessageAdd />,
	statistic: <GoGraph />,
	price: <MdOutlinePriceChange />,
	setting: <IoIosSettings />,
	out: <PiSignOutBold />,
	setting_profile: <CgProfile />,
	setting_app: <MdDisplaySettings />,
	setting_organization: <MdSettings />,
	setting_history_entry_location: <BsGeoAlt />,
	table: <FaTable />,
	details: <FaDrawPolygon />,
}

export default function IconNav({ id }: Pick<TLink, 'id'>) {
	return mapIconsNavLink[id] || <></>
}
