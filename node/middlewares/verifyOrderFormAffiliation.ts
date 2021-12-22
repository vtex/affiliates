import type { App } from '@vtex/clients'

import { APP_CUSTOM_DATA, SUCCESS } from '../utils/constants'

export async function verifyOrderFormAffiliation(
  ctx: UserLoginContext,
  next: () => Promise<unknown>
) {
  const {
    orderForm: { customData },
  } = ctx.state

  const affiliateApp = customData?.customApps?.find(
    (app: App) => app.id === APP_CUSTOM_DATA.id
  )

  if (affiliateApp?.fields?.affiliateId) {
    ctx.status = SUCCESS

    return
  }

  await next()
}
