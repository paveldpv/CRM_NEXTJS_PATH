import { Modal } from '@mui/material'
import { TFormAddNewOrder } from '../../model/Types'
import CusButton from '@/shared/ui/CusButton'
import { FaRegSave } from "react-icons/fa";

export default function FormaAddOrder({ open, setOpen }: TFormAddNewOrder) {
	return (
		<Modal open={open} onClose={()=>setOpen(false)}>
			<form>
				<CusButton>
				<FaRegSave />	
				</CusButton>
			</form>
		</Modal>
	)
}
