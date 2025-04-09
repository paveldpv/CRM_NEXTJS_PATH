import { typicalError } from '../model/types/enums'
import { useRouter } from 'next/router'

export const goToPageError = (typicalError:typicalError)=>{
	const {push}=useRouter()
	push(`/ERROR/${typicalError}`)
}
