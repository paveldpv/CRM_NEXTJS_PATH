import ERROR_PAGE from '@/feature/errors/ui/ERROR_PAGE'
import { typicalError } from '@/shared/model/types/subtypes/enums'

const messageListTypicalError = {
	NOT_GEO: 'для регистрации необходимо разрешить доступ к геолокации',
	NOT_VALID_PAS: 'не верные данные для  авторизации',
	ERROR_DB: 'ошибка запроса к БД',
	ERROR_SERVER: 'ошибка сервиса обработки файлов',
	ERROR_PERMISSION: 'отказано в доступе',
	ERROR_AUTHENTICATE: 'требуется повторная авторизация - время токена истекло',
}

export default function page({ params }: { params: { TYPE_ERROR: typicalError } }) {
	return (
		<ERROR_PAGE>
			<p className=' text-red-500 text-xl cursor-pointer animate-pulse transform scale-90 hover:scale-100 transition-transform duration-300 ease-in-out infinite'>
				{messageListTypicalError[params.TYPE_ERROR]}
			</p>
		</ERROR_PAGE>
	)
}
