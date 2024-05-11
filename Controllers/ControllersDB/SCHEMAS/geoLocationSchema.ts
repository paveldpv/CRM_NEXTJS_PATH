import { TGeoLocation } from "@/Types/subtypes/TGeoLocation";
import { Model, Schema, model, models } from "mongoose";

export const geoLocationSchema = new Schema<TGeoLocation>({
  location: {
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
  },
  date: {
    type: Date,
    required: true,
  },
  process: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: false,
    default: "не отслеживалось",
  },
});

const modelGeoLocation =
  (models.geoLocationSchema as Model<TGeoLocation>) ||
  model<TGeoLocation>("geoLocationSchema", geoLocationSchema);

export default modelGeoLocation;
