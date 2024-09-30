import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";
import { TFieldData } from '@/Types/Types';
const iconFiledFormRegistrated ={
	email:<MdOutlineAlternateEmail />,
	phone:<FaPhone/>,
	password:<FaEyeSlash/>,
	INN:<GoOrganization/>,
	visiblePassword :<FaEye/>
}


type TIconFiledFormRegistrated ={
	nameFiled:keyof typeof iconFiledFormRegistrated
}

export default function IconFieldFormRegistrated({nameFiled}:TIconFiledFormRegistrated) {
	return (
		iconFiledFormRegistrated[nameFiled]||<></>
	)
}