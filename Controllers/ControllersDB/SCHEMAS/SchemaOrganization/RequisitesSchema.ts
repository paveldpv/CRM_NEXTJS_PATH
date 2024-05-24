
import { Model, model, models, Schema } from "mongoose";
import { requisitesBankSchema } from "./RequisitesBankSchema";
import { TRequisites } from "@/Types/subtypes/TRequisites";

export const requisitesSchema = new Schema<TRequisites>({
  INN: {
    type: {
      title: String,
      value: Number,
    },
    required: false,
  },
  KPP: {
    type: {
      title: String,
      value: Number,
    },
    required: false,
  },
  legalAddress: {
    type: {
      title: String,
      value: String,
    },
    required: false,
  },
  mailAddress: {
    type: {
      title: String,
      value: String,
    },
    required: false,
  },
  phone: {
    type: {
      title: String,
      value: String,
    },
    required: false,
  },
  nameDirector: {
    type: {
      title: String,
      value: String,
    },
    required: false,
  },
  email: {
    type: {
      title: String,
      value: String,
    },
    required: false,
  },
  OGRN: {
    type: {
      title: String,
      value: Number,
    },
    required: false,
  },
  OKVD: {
    type: {
      title: String,
      value: [String],
    },
    required: false,
  },
  requisitesBank: {
    type: requisitesBankSchema,
  },
  srcRequisites: {
    type: Schema.Types.Mixed,
    default: "NOT_FOUND",
  },
  safeDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const modelRequisites =
  (models.requisitesSchema as Model<TRequisites>) || model<TRequisites>("requisitesSchema", requisitesSchema);

export default modelRequisites;
