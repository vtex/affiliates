import { APP_CUSTOM_DATA, SUCCESS } from '../utils/constants'

export async function setAffiliateLeadOnCustomData(
  ctx: UserLoginContext,
  next: () => Promise<unknown>
) {
  const {
    clients: { checkout },
    state,
    vtex: { logger },
  } = ctx

  const {
    orderForm: { orderFormId },
    affiliateLead: { affiliateId },
  } = state

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

  ctx.status = SUCCESS
  await next()
}
