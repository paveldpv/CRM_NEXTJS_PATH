import { TRequisites } from '@/Types/Types';
import {Schema}from 'mongoose'
import { requisitesBankSchema } from './RequisitesBankSchema';


export const requisitesSchema = new Schema<TRequisites>({
   INN: {
     type: Number,
     required: false,
   },
   KPP: {
     type: Number,
     required: false,
   },
   legalAddress: {
     type: String,
     required: false,
   },
   mailAddress: {
     type: String,
     required: false,
   },
   phone: {
     type: String,
     required: false,
   },
   nameDirector: {
     type: String,
     required: false,
   },
   email: {
     type: String,
     required: false,
   },
   OGRN: {
     type: Number,
     required: false,
   },
   OKVD:{
    type:[String],
    required:false
   },
   requisitesBank:{
    type:requisitesBankSchema,
    required:false
   },
   srcRequisites:{
    type: Schema.Types.Mixed,
    default: "NOT_FOUND",
  },
   
 });
 