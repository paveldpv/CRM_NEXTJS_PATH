

import { TDaDataOrganization } from "@/Types/subtypes/TDaDataOrganization";
import { TRequisites } from "@/Types/subtypes/TRequisites";
/**
 * 
 * @param data type TDaDataOrganization
 * @returns data type TRequisites
 */
export const getInitialDataRequisites = (daData:TDaDataOrganization,date:Date):Partial<TRequisites>=>{
   const {data,unrestricted_value,value}= daData
   const {management,name,state,address,...otherData}=data

   const dataRequisites:TRequisites = {
      safeDeleted:false,
      INN:{
         title:"ИНН",
         value:data.inn!
      },
      KPP:{
         title:"КПП",
         value:data.kpp
      },
      legalAddress:{
         title:"Юр.Адрес",
         value:address.value
      },
      mailAddress:{
         title:"почтовый адрес",
         value:address.unrestricted_value
      },
      phone:{
         title: "телефон",
         value:"не задано"
      },
      nameDirector:{
         title:"Руководитель",
         value:management.name
      },
      email:{
         title:"элю.почта",
         value:data.emails? data.emails.reduce((acum,cur)=>acum+=cur.value,` `) : "не заданно"
      },
      OGRN:{
         title:"ОГРН",
         value:data.ogrn|| "не задано"
      },
      OKVD:{
         title:"ОКВЭД",
         value:data.okved?.split('.')|| "не задано"
      },
      srcRequisites:"NOT_FOUND",
      requisitesBank:{
         checkingAccount:{
            title:"Расчетный счет",
            value: "не задано"
         },
         nameBank:{
            title:"Наименование банка",
            value: "не задано"
         },
         korAccount:{
            title:"Кор.Счет",
            value: "не задано"
         },
         BIK:{
            title:"БИК",
            value: "не задано"
         }
      }


   }
   return dataRequisites
   

}