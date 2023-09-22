import type { InstanceOptions, IOContext, RequestConfig } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

const routes = {
  schemas: (dataEntity: string) => `/dataentities/${dataEntity}/schemas`,
  delete: (dataEntity: string, schemaName: string) =>
    `dataentities/${dataEntity}/schemas/${schemaName}`,
}

export default class SchemasClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://${context.account}.myvtex.com/api`, context, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdclientAutCookie: context.authToken,
        'Content-Type': 'application/json',
      },
    })
  }

  public getSchemas(dataEntity: string, config?: RequestConfig): Promise<any> {
    return this.http.get(routes.schemas(dataEntity), config)
  }

  public deleteSchemas(
    dataEntity: string,
    schemaName: string,
    config?: RequestConfig
  ): Promise<any> {
    return this.http.delete(routes.delete(dataEntity, schemaName), config)
  }
}
