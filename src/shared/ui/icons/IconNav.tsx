

import { BiMessageAdd } from "react-icons/bi";
import { BsFillFileEarmarkPersonFill, BsCashCoin } from "react-icons/bs";
import { MdOutlinePriceChange } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { LiaTasksSolid } from "react-icons/lia";
import { IoIosSettings } from "react-icons/io";
import { PiSignOutBold } from "react-icons/pi";
import { FaTable } from "react-icons/fa";

import { CgProfile } from "react-icons/cg";
import { MdDisplaySettings } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { BsGeoAlt } from "react-icons/bs";
import { TLink } from '@/shared/model/types/Types'

const mapIconsNavLink = {
  payment: <BsCashCoin />,
  shipment: <FaShippingFast />,
  employee: <BsFillFileEarmarkPersonFill />,
  tasks: <LiaTasksSolid />,
  application: <BiMessageAdd />,
  statistic: <GoGraph />,
  pice: <MdOutlinePriceChange />,
  setting: <IoIosSettings />,
  out: <PiSignOutBold />,
  setting_profile: <CgProfile />,
  setting_app: <MdDisplaySettings />,
  setting_organization: <MdSettings />,
  setting_history_entry_location: <BsGeoAlt />,
  table:<FaTable />
};

export default function IconNav({ id }: Pick<TLink, "id">) {
  return mapIconsNavLink[id] || <></>;
}
