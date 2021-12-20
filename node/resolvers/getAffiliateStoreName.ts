import { isSlugValid } from '../utils/shared'

type Props = {
  affiliateId: string
}

export const getAffiliateStoreName = async (
  _: unknown,
  { affiliateId }: Props,
  { clients: { affiliates } }: Context
) => {
  if (!isSlugValid(affiliateId)) {
    throw new Error('Affiliate ID is not valid')
  }

  const affiliateData = await affiliates.get(affiliateId, ['id', 'storeName'])

  return affiliateData.storeName ?? ''
}
