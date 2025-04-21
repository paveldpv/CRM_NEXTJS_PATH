import Logger from './Logger'

export class ServiceGlobal extends Logger  {
	protected normalizeDataFromMongoDB<T>(data: T) {
    return JSON.parse(JSON.stringify(data)) as T;
  }
}