
import { idLink } from '@/shared/model/types/subtypes/enums'
import { TLink } from '@/shared/model/types/subtypes/Types'
import { ROOT_LINK } from '../Server/Service/servicePermissionRedactData/model/types/Types'

export const adminLinks: TLink[] = [{
		href: ROOT_LINK.order,
		description: 'работа с текущими заказами - прием заказов ',
		title: 'заказы',
		id: idLink.payment,
	},
	{
		href: ROOT_LINK.payment,
		description: 'выставление и отслеживание оплаты счетов ,отправка счетов',
		title: 'расчеты и контрагенты',
		id: idLink.payment,
	},
	// { на 26,01,2026 - нам это скорее всего не приголитсья - отгрузки через старницу заказов
	// 	href: ROOT_LINK.shipment,
	// 	description: 'Отгрузить - формирование ТТН и прочих документов на забор грузов и прием деталей в работу ',
	// 	title: 'Прием/Отгрузки',
	// 	id: idLink.shipment,
	// },
	{
		href: ROOT_LINK.employee,
		description: 'Работа с назначениями, добавление изменение прав сотрудников  ',
		title: 'Сотрудники',
		id: idLink.employee,
	},
	{
		href: ROOT_LINK.taskBoard,
		description: 'Распределения очередность выполнения работ',
		title: 'Задачи',
		id: idLink.tasks,
	},
	{
		href: ROOT_LINK.details,
		description: 'Детали',
		title: 'Детали',
		id: idLink.details,
	},
	{
		href: ROOT_LINK.application,
		description: 'Заявки на просчет стоимости выполнения работ',
		title: 'Входящие заявки',
		id: idLink.application,
	},
	{
		href: ROOT_LINK.storage,
		description: 'Склад',
		title: 'Склад',
		id: idLink.statistic,
	},
	{
		href: ROOT_LINK.price,
		description: 'Прайс и цены',
		title: 'Прайсы',
		id: idLink.price,
		paramsHref:['initialPrice']
	},
	{
		href: ROOT_LINK.setting,
		description: 'Настройки',
		title: 'Настройки',
		id: idLink.setting,
	},
]
