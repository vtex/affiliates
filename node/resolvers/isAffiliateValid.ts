import { isSlugValid } from '../utils/shared'

type Props = {
  slug: string
}

export const isAffiliateValid = async (
  _: unknown,
  { slug }: Props,
  { clients: { affiliates } }: Context
) => {
  if (!isSlugValid(slug)) {
    throw new Error('Slug is not valid')
  }

  const [affiliateData] = await affiliates.search(
    { page: 1, pageSize: 10 },
    ['_all'],
    undefined,
    `slug=${slug}`
  )

  if (!affiliateData) {
    throw new Error('There is no affiliate with this slug')
  }

  return affiliateData?.isApproved
}
