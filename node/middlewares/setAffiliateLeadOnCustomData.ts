import { APP_CUSTOM_DATA } from '../utils/constants'

export async function setAffiliateLeadOnCustomData(
  { clients: { checkout }, state, vtex: { logger } }: UserLoginEventContext,
  next: () => Promise<unknown>
) {
  const {
    orderForm: { orderFormId },
    client: { affiliateId },
  } = state

  //   TODO change this logic to a service so it can be shared with the setAffiliateOnOrderForm resolver
  try {
    await checkout.setSingleCustomData(
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
      metric: 'set-affiliate-lead-on-custom-data',
      message: err.message,
      args: {
        affiliateId,
        orderFormId,
      },
    })
    throw new Error('Error setting affiliate lead on custom data')
  }

  await next()
}
