import { TEntities } from "../abstractsType/abstractsType";

export type TDaDataOrganization = {
   dataRegistrateFormApp?: Date;
 
   value?: string;
   unrestricted_value?: string;
   data: {
     capital?: string;
     kpp: number;
     invalid?: string;
     management: {
       name?: string;
       post?: string;
       disqualified?: string;
     };
     founders?: any; //учередители
     managers?: any; //
     predecessors?: any;
     branch_type?: "MAIN" | "BRANCH";
     branch_count?: number;
     hid?: string;
     type?: "LEGAL " | "PHYSICAL";
     state: {
       status?: "ACTIVE" | "LIQUIDATING" | "LIQUIDATED" | "BANKRUPT" | "REORGANIZING";
       actuality_date?: string;
       registration_date?: string;
       liquidation_date?: string;
     };
     // opf: {
     //   type?: string;
     //   code?: string;
     //   full?: string;
     //   short?: string;
     // };
     name: {
       full_with_opf?: string;
       short_with_opf?: string;
       latin?: string;
       full?: string;
       short?: string;
     };
     inn?: string;
     ogrn?: string;
     okpo?: string;
     okato?: string;
     oktmo?: string;
     okogu?: string;
     okfs?: string;
     okved?: string;
     okveds: {
       main?: string;
       type?: string;
       code?: string;
       name?: string;
     }[];
     address: {
       value?: string;
       unrestricted_value?: string;
     };
     phone?: string;
     emails: {
       value?: string;
     }[];
     ogrn_date?: string;
     employee_count?: number;
   };
 } & TEntities;
 