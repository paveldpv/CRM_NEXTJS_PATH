import { TLink } from "@/Types/Types";
import { idLink } from "@/Types/enums";

export const adminLinks: TLink[] = [
  {
    href: "main/payment",
    description: "выставление и отслеживание оплаты счетов ,отправка счетов",
    title: "расчеты и контрагенты",
    id: idLink.payment,
  },
  {
    href: "main/shipment",
    description:
      "отгрузить - формирование ТТН и прочих документов на забор грузов и прием деталей в работу ",
    title: "Прием/Отгрузки",
    id: idLink.shipment,
  },
  {
    href: "main/employee",
    description: "работа с назначениями, добавление изменение прав сотрудников  ",
    title: "Сотрудники",
    id: idLink.employee,
  },
  {
    href: "main/taskBoard",
    description: "распределения очередность выполнения работ",
    title: "Задачи",
    id: idLink.tasks,
  },
  {
    href: "main/application",
    description: "заявки на просчет стоимости выполнения работ",
    title: "Входящие заявки",
    id: idLink.application,
  },
  {
    href: "main/statistics",
    description: "статистика",
    title: "Статистика",
    id: idLink.statistic,
  },
  {
    href: "main/price",
    description: "Прайс и цены",
    title: "Цены",
    id: idLink.price,
  },
];
