import TextField from '@mui/material/TextField'
import { TFieldFormAdminPanel } from './FormAdminPanel'

import { InputAdornment } from '@mui/material'
import { styleTextFiled } from '../../../../config/muiCustomStyle/textField'


import moment from 'moment'
import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'

export type TChangeBaseData = {} & TFieldFormAdminPanel
/**
 * update,viewing and redaction data:
 *
 * - INN
 *
 * - Name Organization
 *
 * - date registration
 */

export default function ChangeBaseDataOrganization({
	activeField,
	defaultData,
	handlerChange,
}: TChangeBaseData) {
	return (
		<Fieldset legend='Основное' className=' col-span-2 '>
			<div className=' flex  flex-col gap-2'>
				<TextField
					disabled
					value={defaultData.INN}
					{...styleTextFiled}
					name='INN'
					placeholder='ИНН'
				/>
				<TextField
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<span className='  rounded-sm p-1'>
									«{defaultData.nameOrganization?.abbreviated}»
								</span>
							</InputAdornment>
						),
						style: { color: '#64A989', fontSize: 14, borderColor: '#64A989' },
					}}
					onChange={handlerChange}
					placeholder='Название организации'
					disabled={activeField}
					defaultValue={defaultData?.nameOrganization?.fullName}
					{...styleTextFiled}
					name='dataOrganization.nameOrganization.fullName'
					multiline
					label='название организации'
				/>
				<span className=' pt-2 text-xs'>
					дата регистрации в системе :{' '}
					{moment(defaultData.dateRegistration).format('D/M/YYYY')}
				</span>
			</div>
		</Fieldset>
	)
}
