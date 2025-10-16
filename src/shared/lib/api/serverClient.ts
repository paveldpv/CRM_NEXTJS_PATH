import { VERSION_API } from '../../../../config/config'
import { ApiClient } from './api-client'

export const serverClient = new ApiClient(`api/${VERSION_API}`)