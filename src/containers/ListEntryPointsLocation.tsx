
import { TListEntryPointsLocation } from "@/app/[INN]/main/setting/historyEntryLocation/[RANGE]/page";
import { TGeoLocation } from "@/Types/subtypes/TGeoLocation";
import { TDBUser } from "@/Types/Types";
import moment from "moment";
import { GiPositionMarker } from "react-icons/gi";



const processEntry = {
  REDACT: {
    title: "Изменение данных",
    color: "bg-blue-400",
  },
  AUTH: {
    title: "Вход в систему",
    color: "bg-blue-400",
  },
  REGISTRATE: {
    title: "Регистрация",
    color: "bg-red-400 ",
  },
};

export default function ListEntryPointsLocation( {dataEntryUsers }: TListEntryPointsLocation) {
  
  
  return (
    <div className=" ">
     
      {dataEntryUsers.map((personalData, index) => {
        return (
          <ul key={index} className="grid     grid-cols-4 gap-2 mt-2">
            <li>
              <ul className=" itemList ">
                <li>{personalData.name}</li>
                <li>{personalData.surname}</li>
                <li>{personalData.lastName}</li>
              </ul>
            </li>
            <li className={`${processEntry[personalData.process].color}  flex items-center justify-center`}>
              {processEntry[personalData.process].title}
            </li>
            
              <a
              className="  flex items-center justify-center  itemList hover:bg-color_header  delay-100  duration-300 "
                href={`https://www.openstreetmap.org/#map=18/${personalData.location.latitude}/${personalData.location.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GiPositionMarker />
              </a>
          
            <li className=" itemList">{moment(personalData.date).format("DD - MM - YYYY")}</li>
          </ul>
        );
      })}
    </div>
  );
}
