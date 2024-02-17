import { Schema, model, models } from "mongoose";

import { TDataOrganization } from "@/Types/Types";

import { requisitesSchema } from "./requisitesSchema";

export const organizationSchema = new Schema<TDataOrganization>({
  idAdministrators: {
    type: [String],
    required: false,
  },
  INN: {
    type: Number,
    required: false,
  },
  nameOrganization: {
    type: String,
    required: false,
  },
  requisites: {
    type: requisitesSchema,
    required: false,
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
    },
    required: false,
  },
});

const modelOrganization =
  models.organizationSchema|| model<TDataOrganization>("organizationSchema", organizationSchema) ;

export default modelOrganization;
