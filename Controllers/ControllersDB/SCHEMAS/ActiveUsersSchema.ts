import { TActiveUser } from "@/Types/subtypes/TActiveUser";
import { Model, Schema, model, models } from "mongoose";

export const ActiveUserSchema = new Schema<TActiveUser>({
  idUser: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  dataEntry: {
    lastActiveTime: {
      type: Date,
      required: true,
    },
    historyDateActive: {
      type: [Date],
      required: false,
    },
  },
  token:{
   type:String,
   required:false
  }
});
const modelActiveUser = models.ActiveUserSchema as Model<TActiveUser> || model<TActiveUser>("ActiveUserSchema", ActiveUserSchema);
export default modelActiveUser;
