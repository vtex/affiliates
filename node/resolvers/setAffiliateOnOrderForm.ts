import { APP_CUSTOM_DATA } from '../utils/constants'
import { isSlugValid } from '../utils/shared'

type Props = {
  slug: string
  orderFormId: string
}

export const setAffiliateOnOrderForm = async (
  _: unknown,
  { slug, orderFormId }: Props,
  { clients: { affiliates, checkout }, vtex: { logger } }: Context
) => {
  if (!isSlugValid(slug)) {
    throw new Error('Affiliate slug is not valid')
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

  if (!affiliateData?.isApproved) {
    throw new Error('Affiliate is not valid')
  }

  const affiliateId = affiliateData.id as string

  try {
    return checkout.setSingleCustomData(
      orderFormId,
      {
        appId: APP_CUSTOM_DATA.id,
        appFieldName: APP_CUSTOM_DATA.fields[0],
        value: affiliateId,
      },
      'AUTH_TOKEN'
    )
  } catch (err) {
    logger.error({
      metric: 'set-affiliate-on-orderform',
      message: err.message,
      args: {
        affiliateId,
        orderFormId,
      },
    })
    throw new Error('Error setting affiliate on order form')
  }
}
