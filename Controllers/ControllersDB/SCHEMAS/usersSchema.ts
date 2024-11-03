import { Model, Schema, model, models } from "mongoose";

import { TDBUser } from "@/Types/Types";

export const userSchema = new Schema<TDBUser>({
  srcPhoto: {
    type: Schema.Types.Mixed,
    default: "NOT_FOUND",
  },
  INN: String,
  email: {
    type:String,
    default:'не указано'
  },
  password: String,
  phone: String,
  idUser: String,
  dateRegistrate: {
    type:Date,
    default:new Date()
  },
  lastName: {
    type: String,
    default: "не указано",
  },
  name: {
    type: String,
    default: "не указано",
  },
  surname: {
    type: String,
    default: "не указано",
  },
  nameJobTitle: {
    type: String,
    default: "не заданно",
  },
  dateBirthday: {
    type: Date,
    default: new Date(),
  },
  safeDeleted:{
    type:Boolean,
    default:false
  },
  linksAllowed: Schema.Types.Mixed,
})





const modelUser = models.user as Model<TDBUser>  || model<TDBUser >("user", userSchema);

export default modelUser;
