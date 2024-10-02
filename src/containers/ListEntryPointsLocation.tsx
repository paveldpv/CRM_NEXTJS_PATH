
import moment from "moment";
import Image from "next/image";
import { mapCity } from "../../config/urls";
import { PURPOSE_USE } from "@/Types/subtypes/TGeoLocation";
import { TListEntryPointsLocation } from '@/app/[INN]/[PHONE]/main/setting/historyEntryLocation/[...FILTER]/page'
// import { TListEntryPointsLocation } from "@/app/[INN]/main/setting/historyEntryLocation/[...FILTER]/page";



export const processEntry:Record<PURPOSE_USE,{title:string,bgColor:string} > = {
  REDACT: {
    title: "Изменение данных",
    bgColor: "linear-gradient(152deg, rgba(255,255,255,1) 0%, rgba(125,211,252,1) 75%)",
  },
  AUTH: {
    title: "Вход в систему",
    bgColor: "linear-gradient(152deg, rgba(255,255,255,1) 0%, rgba(132,204,22,1) 75%)",
  },
  REGISTRATE: {
    title: "Регистрация",
    bgColor: "linear-gradient(152deg, rgba(255,255,255,1) 0%, rgba(248,113,113,1) 75%)",
  },
};

export default function ListEntryPointsLocation({ dataEntryUsers }: Omit<TListEntryPointsLocation,'listEmployee'>) {
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
            <li
              style={{ background: `${processEntry[personalData.process].bgColor}` }}
              className={`itemList flex items-center justify-center`}
            >
              {processEntry[personalData.process].title}
            </li>
            <li>
              <a
                className=" overflow-hidden itemList  flex items-center justify-center   hover:bg-color_header  delay-100  duration-300 "
                href={`https://www.openstreetmap.org/#map=18/${personalData.location.latitude}/${personalData.location.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  style={{ objectFit: "cover", height: "60px" }}
                  className=" rounded-md "
                  src={mapCity}
                  alt={"местоположение"}
                  loading="lazy"
                  height={60}
                  width={370}
                />
              </a>
            </li>

            <li className=" itemList flex justify-center items-center">
              {moment(personalData.date).format("DD - MM - YYYY")}
            </li>
          </ul>
        );
      })}
    </div>
  );
}
