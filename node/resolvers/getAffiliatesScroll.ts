import type { QueryGetAffiliatesArgs } from 'vtex.affiliates'

import { parseAffiliatesFilters } from '../utils/filters'
import type { AffiliateInput } from '../typings/affiliates'

export const getAffiliatesScroll = async (
  _: unknown,
  { filter, sorting }: QueryGetAffiliatesArgs,
  { clients: { affiliates } }: Context
): Promise<AffiliateInput[]> => {
  const responseData: AffiliateInput[][] = []
  let MD_TOKEN = ''

  let hasMoreData = true
  const fields = ['id', 'name', 'email']
  const sort = sorting ? `${sorting.field} ${sorting.order}` : undefined
  const where = filter ? parseAffiliatesFilters(filter) : undefined

  while (hasMoreData) {
    // eslint-disable-next-line no-await-in-loop
    const { data, mdToken } = await affiliates.scroll({
      fields,
      size: 1000,
      sort,
      where,
      mdToken: MD_TOKEN !== '' ? MD_TOKEN : undefined,
    })

    responseData.push(data as AffiliateInput[])

    MD_TOKEN = MD_TOKEN !== '' ? MD_TOKEN : mdToken

    if (data.length === 0) {
      hasMoreData = false
    }
  }

  const documents = responseData.flat()

  return documents
}
