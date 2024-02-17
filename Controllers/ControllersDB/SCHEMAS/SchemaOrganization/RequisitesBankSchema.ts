import { TRequisitesBank } from '@/Types/Types';
import {Schema}from 'mongoose'

export const requisitesBankSchema = new Schema<TRequisitesBank>({
   checkingAccount:Number,
   nameBank:String,
   korAccount:String,
   BIK:Number
});