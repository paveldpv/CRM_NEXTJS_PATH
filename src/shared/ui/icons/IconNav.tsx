import { BiMessageAdd } from 'react-icons/bi'
import { BsCashCoin, BsFillFileEarmarkPersonFill, BsGear } from 'react-icons/bs'
import { FaBook, FaDrawPolygon, FaMapMarkerAlt, FaShippingFast, FaSignOutAlt, FaTable } from 'react-icons/fa'
import { GoGraph } from 'react-icons/go'
import { IoIosSettings } from 'react-icons/io'
import { LiaTasksSolid } from 'react-icons/lia'
import { MdOutlinePriceChange, MdStorage } from 'react-icons/md'

import { TLink } from '@/shared/model/types/subtypes/Types'
import { CgProfile } from 'react-icons/cg'
import { MdDisplaySettings } from 'react-icons/md'
import { FaBookBookmark } from 'react-icons/fa6'

const mapIconsNavLink = {
	order: <FaBookBookmark />,
	payment: <BsCashCoin />,
	shipment: <FaShippingFast />,
	employee: <BsFillFileEarmarkPersonFill />,
	tasks: <LiaTasksSolid />,
	application: <BiMessageAdd />,
	statistic: <GoGraph />,
	price: <MdOutlinePriceChange />,
	setting: <IoIosSettings />,
	out: <FaSignOutAlt />, // или <PiSignOutBold />
	setting_profile: <CgProfile />,
	setting_app: <MdDisplaySettings />,
	setting_organization: <BsGear />,
	setting_history_entry_location: <FaMapMarkerAlt />,
	table: <FaTable />,
	details: <FaDrawPolygon />,
	storage: <MdStorage />,
}

export default function IconNav({ id }: Pick<TLink, 'id'>) {
	return mapIconsNavLink[id] || <></>
}
