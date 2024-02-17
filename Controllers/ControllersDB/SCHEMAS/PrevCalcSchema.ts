import { model, Schema, models } from "mongoose";

import { TRequestPrevCalc } from "@/Types/Types";

export const prevCalcSchema = new Schema<TRequestPrevCalc>({
  idRequest: String,
  dateRequest: Date,
  favorites: {
    required: true,
    default: false,
    type: Boolean,
  },
  safeDeleted: {
    required: true,
    default: false,
    type: Boolean,
  },
  verified: {
    required: true,
    default: false,
    type: Boolean,
  },
  dataSketch: [
    {
      idSketch: String,
      lines: [
        {
          idLine: String,
          points: [Number],
          mark: String,
          value: {
            required: false,
            type: Schema.Types.Mixed,
          },
        },
      ],
      params: [
        {
          idLine: String,
          mark: String,
          description: String,
          value: {
            required: false,
            type: Schema.Types.Mixed,
          },
        },
      ],
    },
  ],
  dataClient: {
    email: String,
    phone: String,
    name: {
      type: String,
      default: "Не указано",
    },
    surName: {
      type: String,
      default: "Не указано",
    },
    INN: {
      type: String,
      default: "Не указано",
    },
    description: {
      type: String,
      required: false,
    },
    files: {
      required: false,
      type: [{ FullPath: String, NameFile: String, DateTimeUpdateFile: String, Errored: Boolean, IDFile: String }],
    },
  },
});

const modelPrevCalc = models.prevCalc || model<TRequestPrevCalc>("prevCalc", prevCalcSchema);

export default modelPrevCalc;
