import { TLink } from "@/Types/Types";
import { idLink } from "@/Types/enums";

export const adminLinks: TLink[] = [
  {
    href: "payment",
    description: "выставление и отслеживание оплаты счетов ,отправка счетов",
    title: "расчеты и контрагенты",
    id: idLink.payment,
  },
  {
    href: "shipment",
    description:
      "отгрузить - формирование ТТН и прочих документов на забор грузов и прием деталей в работу ",
    title: "Прием/Отгрузки",
    id: idLink.shipment,
  },
  {
    href: "employee",
    description: "работа с назначениями, добавление изменение прав сотрудников  ",
    title: "Сотрудники",
    id: idLink.employee,
  },
  {
    href: "taskBoard",
    description: "распределения очередность выполнения работ",
    title: "Задачи",
    id: idLink.tasks,
  },
  {
    href: "application",
    description: "заявки на просчет стоимости выполнения работ",
    title: "Входящие заявки",
    id: idLink.application,
  },
  {
    href: "statistics",
    description: "статистика",
    title: "Статистика",
    id: idLink.statistic,
  },
  {
    href: "price",
    description: "Прайс и цены",
    title: "Цены",
    id: idLink.price,
  },
  {
    href: "setting",
    description: "Настройки",
    title: "Настройки",
    id: idLink.setting,
  },
];
