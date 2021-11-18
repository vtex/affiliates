import type { EventContext } from '@vtex/api'
import type { App } from '@vtex/clients'

import type { Clients } from '../clients'
import { APP_CUSTOM_DATA } from '../utils/constants'

export async function setupAppConfiguration(ctx: EventContext<Clients>) {
  const {
    clients: { checkout },
    vtex: { logger },
  } = ctx

  const currentCheckoutConfig = await checkout.getOrderFormConfiguration()

  const isAppAlreadySet = currentCheckoutConfig.apps.some(
    (app: App) => app.id === APP_CUSTOM_DATA.id
  )

  if (isAppAlreadySet) {
    return
  }

  try {
    await checkout.setOrderFormConfiguration({
      ...currentCheckoutConfig,
      apps: [...currentCheckoutConfig.apps, APP_CUSTOM_DATA],
    })
    logger.info({
      metric: 'setup-app-config',
      message: 'App sucessfully configured',
    })
  } catch (err) {
    logger.error({
      metric: 'setup-app-config',
      message: err.message,
    })
    throw new Error('Error setting app configurations')
  }
}
