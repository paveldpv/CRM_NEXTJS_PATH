
import { TRequisitesBank } from "@/Types/subtypes/TRequisites";
import { Schema } from "mongoose";

export const requisitesBankSchema = new Schema<TRequisitesBank>({
  
  checkingAccount: {
    type: {
      title: String,
      value: Number,
    },
   
    required:false
  },
  nameBank: {
    required:false,
    type: {
      title: String,
      value: String,
    },
  },
  korAccount: {
    required:false,
    type: {
      title: String,
      value: String,
    },
  },
  BIK: {
    required:false,
    type: {
      title: String,
      value: Number,
    },
  },
});
