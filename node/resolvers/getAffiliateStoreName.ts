import type { Affiliates } from 'vtex.affiliates'

import { findDocumentsByField, isSlugValid } from '../utils/shared'

type Props = {
  slug: string
}

export const getAffiliateStoreName = async (
  _: unknown,
  { slug }: Props,
  { clients: { affiliates } }: Context
) => {
  if (!isSlugValid(slug)) {
    throw new Error('Slug is not valid')
  }

  const [affiliateData] = await findDocumentsByField<Affiliates>(
    affiliates,
    'slug',
    slug
  )

  if (!affiliateData) {
    throw new Error('There is no affiliate with this slug')
  }

  return affiliateData.storeName ?? ''
}
