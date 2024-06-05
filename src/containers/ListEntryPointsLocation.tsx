
import { TListEntryPointsLocation } from "@/app/[INN]/main/setting/historyEntryLocation/[RANGE]/page";
import { TGeoLocation } from "@/Types/subtypes/TGeoLocation";
import { TDBUser } from "@/Types/Types";
import moment from "moment";
import { GiPositionMarker } from "react-icons/gi";



const processEntry = {
  REDACT: {
    title: "Изменение данных",
    color: "text-blue-400",
  },
  AUTH: {
    title: "Вход в систему",
    color: "text-lime-500",
  },
  REGISTRATE: {
    title: "Регистрация",
    color: "text-red-400 ",
  },
};

export default function ListEntryPointsLocation( {dataEntryUsers }: TListEntryPointsLocation) {
  return (
    <div>
      <ul>
        <li>Сотрудник</li>
        <li>Цель</li>
        <li>Точка Входа</li>
        <li>время</li>
      </ul>
      {dataEntryUsers.map((personalData, index) => {
        return (
          <ul key={index}>
            <li>
              <ul>
                <li>{personalData.name}</li>
                <li>{personalData.surname}</li>
                <li>{personalData.lastName}</li>
              </ul>
            </li>
            <li className={`${processEntry[personalData.process].color}`}>
              {processEntry[personalData.process].title}
            </li>
            <li>
              <a
              className=" text-3xl text-green-400"
                href={`https://www.openstreetmap.org/#map=18/${personalData.location.latitude}/${personalData.location.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GiPositionMarker />
              </a>
            </li>
            <li>{moment(personalData.date).format("MM dd YYYY")}</li>
          </ul>
        );
      })}
    </div>
  );
}
