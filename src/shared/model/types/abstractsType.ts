import { Types } from 'mongoose'

export type TEntities ={
   _id: Types.ObjectId
   safeDeleted:boolean
}

export type TValueFiled<T> = {
   title: string;
   value?: T;
 };
 