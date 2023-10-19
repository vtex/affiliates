import type { Affiliates } from '../typings/affiliates'

export const fieldResolvers = {
  Affiliate: {
    affiliateId: (root: Affiliates) => root.id,
  },
}
