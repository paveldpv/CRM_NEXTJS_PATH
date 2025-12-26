// shared/lib/mongoHelpers.ts
import { Types } from 'mongoose'

export class MongoHelpers {
 
  static stringToObjectId(idString: string): Types.ObjectId | null {
    if (!idString || !Types.ObjectId.isValid(idString)) {
      return null
    }
    return new Types.ObjectId(idString)
  }

  static stringsToObjectIdsTuple<T extends string[]>(
    ...ids: T
  ): { [K in keyof T]: Types.ObjectId } | null {

    const result: Types.ObjectId[] = []
    
    for (const id of ids) {
      const objectId = this.stringToObjectId(id)
      if (objectId==null) return null
      result.push(objectId)
    }
    
    return result as { [K in keyof T]: Types.ObjectId }
  }

  static stringsToObjectIds(ids: string[]): Types.ObjectId[] | null {
  const objectIds: Types.ObjectId[] = []
  
  for (const id of ids) {
    const objectId = this.stringToObjectId(id)
    if (objectId === null) return null
    objectIds.push(objectId)
  }
  
  return objectIds
}
  
}