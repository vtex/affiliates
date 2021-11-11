import type { ClientsConfig, ServiceContext, RecorderState } from '@vtex/api'
import { method, Service } from '@vtex/api'

import { Clients } from './clients'
import { createAffiliate } from './middlewares/createAffiliate'
import { validateCreate } from './middlewares/validateCreate'
import type { AffiliateInput } from './typings/affiliates'

const TIMEOUT_MS = 1000

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 3,
      timeout: TIMEOUT_MS,
    },
  },
}

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients, State>

  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  interface State extends RecorderState {
    affiliate: AffiliateInput
  }
}

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  routes: {
    affiliate: method({
      POST: [validateCreate, createAffiliate],
    }),
  },
})
