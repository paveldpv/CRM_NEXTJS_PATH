import { Types } from 'mongoose'

export const stringToObjectId = (str:string):Types.ObjectId=>new Types.ObjectId(str)