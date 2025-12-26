import { TWithoutPassUser } from '@/shared/model/types/subtypes/Types'

export type TFormProfile = {
	initialValues: TWithoutPassUser
	setInfoUser?: (state: TWithoutPassUser) => void
}
