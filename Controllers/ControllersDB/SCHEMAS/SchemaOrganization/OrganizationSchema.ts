import mongoose, { Model, Mongoose, Schema, model, models } from "mongoose";

import { TDataOrganization } from "@/Types/subtypes/TOrganization";

import { requisitesSchema } from "./RequisitesSchema";



export const organizationSchema = new Schema<TDataOrganization>({
  INN: {
    type: Number,
    required: false,
  },
  dateRegistration: {
    type: Date,
    required: true,
  },
  nameOrganization: {
    type: {
      abbreviated: {
        type: String,
        default: "Не задано",
      },
      fullName: {
        type: String,
        default: "Не задано",
      },
    },
  },
  
  paramsEmailNewsletter: {
    type: {
      password: String,
      email: String,
      dataUpdate: String,
    },
    required: false,
  },
  seal: {
    type: Schema.Types.Mixed,
    default: "NOT_FOUND",
  },
  telegram: {
    type: {
      idTelegramBot: String,
      hrefChat: {
        type: String,
        required: false,
        default: "не задан",
      },
    },
    default: {
      hrefChat: "не задан",
    },
    required: false,
  },
  actualAddress:{
    type:{
      location:{
        latitude:{
          type:Number,
          required:true,
          default:0
        },
        longitude:{
          type:Number,
          required:true,
          default:0
        }

      },actualAddress:{
        type:String,
        required:true,
        default:"не задано"

      }
    }
  }
})






const modelOrganization =
  (models.organizationSchema as Model<TDataOrganization>) ||
  model<TDataOrganization>("organizationSchema", organizationSchema);


  


export default modelOrganization;
