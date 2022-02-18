import type { Affiliates } from 'vtex.affiliates'

export const fieldResolvers = {
  Affiliate: {
    affiliateId: (root: Affiliates) => root.id,
  },
}
