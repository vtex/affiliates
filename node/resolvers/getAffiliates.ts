import type { QueryGetAffiliatesArgs } from 'vtex.affiliates'

import { parseAffiliatesFilters } from '../utils/filters'

export const getAffiliates = async (
  _: unknown,
  { page, pageSize, filter, sorting }: QueryGetAffiliatesArgs,
  { clients: { affiliates } }: Context
) => {
  const pagination = { page, pageSize }
  const fields = ['_all']
  const sort = sorting ? `${sorting.field} ${sorting.order}` : undefined
  const where = filter ? parseAffiliatesFilters(filter) : undefined

  return affiliates.searchRaw(pagination, fields, sort, where)
}
