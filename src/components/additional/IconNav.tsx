import { TLink } from "@/Types/Types";


import {BiMessageAdd } from "react-icons/bi"
import {BsFillFileEarmarkPersonFill,BsCashCoin} from  'react-icons/bs'
import {MdOutlinePriceChange} from 'react-icons/md'
import {FaShippingFast } from 'react-icons/fa'
import {GoGraph} from 'react-icons/go'
import {LiaTasksSolid} from 'react-icons/lia'
import { IoIosSettings } from "react-icons/io";
import { PiSignOutBold } from "react-icons/pi";

const mapIconsNavLink ={
  payment:<BsCashCoin />,
  shipment:<FaShippingFast />,
  employee:<BsFillFileEarmarkPersonFill />,
  tasks:<LiaTasksSolid />,
  application:<BiMessageAdd />,
  statistic:<GoGraph />,
  pice:<MdOutlinePriceChange />,
  setting:<IoIosSettings />,
  out:<PiSignOutBold  />
}


export default function IconNav({ id }: Pick<TLink, "id">) {  
  return mapIconsNavLink[id]|| <></>
}
