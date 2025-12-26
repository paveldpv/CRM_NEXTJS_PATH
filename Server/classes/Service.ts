import ContextOrganization from "./contextOrganization";

export class Service extends ContextOrganization {
  protected normalizeDataFromMongoDB<T>(data: T) {
    return JSON.parse(JSON.stringify(data)) as T;
  }
}
