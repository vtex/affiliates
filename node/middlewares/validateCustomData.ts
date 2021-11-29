import type { App } from '@vtex/clients'

import { APP_CUSTOM_DATA } from '../utils/constants'

export async function validateCustomData(
  { clients: { affiliates }, state }: StatusChangeContext,
  next: () => Promise<unknown>
) {
  const {
    order: { customData },
  } = state

  const affiliateApp = customData?.customApps?.find(
    (app: App) => app.id === APP_CUSTOM_DATA.id
  )

  if (!affiliateApp) {
    return
  }

  const affiliateData = await affiliates.get(affiliateApp.fields.affiliateId, [
    'id',
    'isApproved',
  ])

  if (!affiliateData?.isApproved) {
    throw new Error('Affiliate is not valid')
  }

  await next()
}
