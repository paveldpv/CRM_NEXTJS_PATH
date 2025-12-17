// shared/lib/mongoHelpers.ts
import { Types } from 'mongoose'

export class MongoHelpers {
 
  static stringToObjectId(idString: string): Types.ObjectId | null {
    if (!idString || !Types.ObjectId.isValid(idString)) {
      return null
    }
    return new Types.ObjectId(idString)
  }

  static stringsToObjectIds<T extends string[]>(
    ...ids: T
  ): { [K in keyof T]: Types.ObjectId } | null {
    const result: Types.ObjectId[] = []
    
    for (const id of ids) {
      const objectId = this.stringToObjectId(id)
      if (!objectId) return null
      result.push(objectId)
    }
    
    return result as { [K in keyof T]: Types.ObjectId }
  }
  
}