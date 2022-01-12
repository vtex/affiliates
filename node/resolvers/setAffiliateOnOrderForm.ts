import { APP_CUSTOM_DATA } from '../utils/constants'
import { isSlugValid } from '../utils/shared'

type Props = {
  affiliateId: string
  orderFormId: string
}

export const setAffiliateOnOrderForm = async (
  _: unknown,
  { affiliateId, orderFormId }: Props,
  { clients: { affiliates, checkout }, vtex: { logger } }: Context
) => {
  if (!isSlugValid(affiliateId)) {
    throw new Error('Affiliate ID is not valid')
  }

  const affiliateData = await affiliates.get(affiliateId, ['id', 'isApproved'])

  if (!affiliateData?.isApproved) {
    throw new Error('Affiliate is not valid')
  }

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
