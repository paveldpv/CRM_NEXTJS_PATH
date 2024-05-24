
import { TConfigAPP } from "@/Types/subtypes/TAppearanceConfigApp";
import { Schema, model, models } from "mongoose";



export const configSchema = new Schema<TConfigAPP>({
  idUser: String, 
  configHeader: {
    color: {
      bgColor: String,
      textColor: String,
      borderColor: String,
    },
    textSize: String,
    font: String,
    name: String,
    keyConfig: String,
  },
  configMain: {
    color: {
      bgColor: String,
      textColor: String,
      borderColor: String,
    },
    textSize: String,
    font: String,
    name: String,
    keyConfig: String,
  },
  configNavMenu: {
    color: {
      bgColor: String,
      textColor: String,
      borderColor: String,
    },
    textSize: String,
    font: String,
    name: String,
    keyConfig: String,
  },
});
const modelConfig = models.config || model<TConfigAPP>("config", configSchema);
export default modelConfig;
