import type { App } from '@vtex/clients'

import { APP_CUSTOM_DATA } from '../utils/constants'

export async function verifyOrderFormAffiliation(
  { state }: UserLoginContext,
  next: () => Promise<unknown>
) {
  const {
    orderForm: { customData },
  } = state

  const affiliateApp = customData?.customApps?.find(
    (app: App) => app.id === APP_CUSTOM_DATA.id
  )

  if (affiliateApp?.fields?.affiliateId) {
    return
  }

  await next()
}
