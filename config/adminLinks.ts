import { TLink } from "@/Types/Types";
import { idLink } from "@/Types/enums";
import { ROOT_LINK } from '@/Types/enums';
export const adminLinks: TLink[] = [
  {
    href: ROOT_LINK.payment,
    description: "выставление и отслеживание оплаты счетов ,отправка счетов",
    title: "расчеты и контрагенты",
    id: idLink.payment,
    
  },
  {
    href: ROOT_LINK.shipment,
    description:
      "отгрузить - формирование ТТН и прочих документов на забор грузов и прием деталей в работу ",
    title: "Прием/Отгрузки",
    id: idLink.shipment,
  },
  {
    href: ROOT_LINK.employee,
    description: "работа с назначениями, добавление изменение прав сотрудников  ",
    title: "Сотрудники",
    id: idLink.employee,
  },
  {
    href: ROOT_LINK.taskBoard,
    description: "распределения очередность выполнения работ",
    title: "Задачи",
    id: idLink.tasks,
  },
  {
    href: ROOT_LINK.application,
    description: "заявки на просчет стоимости выполнения работ",
    title: "Входящие заявки",
    id: idLink.application,
  },
  {
    href: ROOT_LINK.statistics,
    description: "статистика",
    title: "Статистика",
    id: idLink.statistic,
  },
  {
    href: ROOT_LINK.price,
    description: "Прайс и цены",
    title: "Цены",
    id: idLink.price,
  },
  {
    href: ROOT_LINK.setting,
    description: "Настройки",
    title: "Настройки",
    id: idLink.setting,
  },
];
