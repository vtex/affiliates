import type { InstanceOptions, IOContext } from '@vtex/api'
import type { PaginationArgs, WithMetadata } from '@vtex/clients'
import { MasterDataEntity } from '@vtex/clients'

type ScrollInput<K> = {
  fields: Array<ThisType<K> | '_all'>
  sort?: string
  size?: number
  mdToken?: string
}

export const withCustomSchema = <TEntity extends Record<string, unknown>>(
  schema: string,
  _MasterdataClient: new (
    context: IOContext,
    options?: InstanceOptions
  ) => MasterDataEntity<TEntity>
): new (
  context: IOContext,
  options?: InstanceOptions
) => MasterDataEntity<TEntity> => {
  return class extends MasterDataEntity<TEntity> {
    public dataEntity: string
    public schema: string
    public client: MasterDataEntity<TEntity>

    constructor(ctx: IOContext, options?: InstanceOptions) {
      super(ctx, options)
      this.client = new _MasterdataClient(ctx, options)
      this.dataEntity = this.client.dataEntity
      this.schema = schema
      this.client.schema = schema
    }

    public save(entity: TEntity) {
      return this.client.save(entity)
    }

    public update(id: string, fields: Partial<TEntity>) {
      return this.client.update(id, fields)
    }

    public saveOrUpdate(fields: TEntity & { id: string }) {
      return this.client.saveOrUpdate(fields)
    }

    public delete(id: string) {
      return this.client.delete(id)
    }

    // These es-lint disables are needed because I have to extend the class and its methods surpass the max params.
    // eslint-disable-next-line max-params
    public search<K extends keyof WithMetadata<TEntity>>(
      pagination: PaginationArgs,
      fields: Array<ThisType<K> | '_all'>,
      sort?: string,
      where?: string
    ): Promise<Array<Pick<WithMetadata<TEntity>, K>>> {
      return this.client.search(pagination, fields, sort, where)
    }

    // eslint-disable-next-line max-params
    public searchRaw<K extends keyof WithMetadata<TEntity>>(
      pagination: PaginationArgs,
      fields: Array<ThisType<K> | '_all'>,
      sort?: string,
      where?: string
    ): Promise<{
      data: Array<Pick<WithMetadata<TEntity>, K>>
      pagination: { total: number; page: number; pageSize: number }
    }> {
      return this.client.searchRaw(pagination, fields, sort, where)
    }

    public get<K extends keyof WithMetadata<TEntity>>(
      id: string,
      fields: Array<ThisType<K> | '_all'>
    ) {
      return this.client.get(id, fields)
    }

    public async scroll<K extends keyof WithMetadata<TEntity>>(
      input: ScrollInput<K>
    ) {
      return this.client.scroll(input)
    }
  }
}
