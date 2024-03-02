import { Schema, model, models } from "mongoose";

import { TDataOrganization } from "@/Types/Types";

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
    type: String,
    required: false,
    default: "не задано",
  },
  requisites: {
    type: requisitesSchema,
    required:false
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
    required: false,
  },
});

const modelOrganization =
  models.organizationSchema || model<TDataOrganization>("organizationSchema", organizationSchema);

export default modelOrganization;
