import type {
  ClientsConfig,
  ServiceContext,
  RecorderState,
  EventContext,
} from '@vtex/api'
import { method, Service } from '@vtex/api'

import { Clients } from './clients'
import { createAffiliate } from './middlewares/createAffiliate'
import { getClient } from './middlewares/getClient'
import { getOrder } from './middlewares/getOrder'
import { setupAppConfiguration } from './middlewares/setupAppConfiguration'
import { updateAffiliate } from './middlewares/updateAffiliate'
import { updateLead } from './middlewares/updateLead'
import { validateLead } from './middlewares/validateLead'
import { validateCreate } from './middlewares/validateCreate'
import { validateCustomData } from './middlewares/validateCustomData'
import { validateUpdate } from './middlewares/validateUpdate'
import { isAffiliateValid } from './resolvers/isAffiliateValid'
import { setAffiliateOnOrderForm } from './resolvers/setAffiliateOnOrderForm'
import type { AffiliateInput } from './typings/affiliates'
import { setAffiliateLeadOnCustomData } from './middlewares/setAffiliateLeadOnCustomData'
import { verifyOrderAffiliation } from './middlewares/verifyOrderAffiliation'
import { getOrderForm } from './middlewares/getOrderForm'
import { getClientFromOrderForm } from './middlewares/getClientFromOrderForm'
import { verifyClientAffiliation } from './middlewares/verifyClientAffiliation'
import { getAffiliateStoreName } from './resolvers/getAffiliateStoreName'

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

  interface StatusChangeContext extends EventContext<Clients> {
    body: {
      domain: string
      orderId: string
      currentState: string
      lastState: string
      currentChangeDate: string
      lastChangeDate: string
    }
  }

  interface UserLoginEventContext extends EventContext<Clients> {
    body: {
      orderFormId: string
    }
  }

  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  interface State extends RecorderState {
    affiliate?: AffiliateInput
  }
}

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  routes: {
    affiliate: method({
      POST: [validateCreate, createAffiliate],
      PATCH: [validateUpdate, updateAffiliate],
    }),
  },
  graphql: {
    resolvers: {
      Query: {
        isAffiliateValid,
        getAffiliateStoreName,
      },
      Mutation: {
        setAffiliateOnOrderForm,
      },
    },
  },
  events: {
    onAppInstalled: setupAppConfiguration,
    setAffiliateLead: [
      getOrder,
      validateCustomData,
      getClient,
      validateLead,
      updateLead,
    ],
    verifyUserAffiliateLead: [
      getOrderForm,
      verifyOrderAffiliation,
      getClientFromOrderForm,
      verifyClientAffiliation,
      setAffiliateLeadOnCustomData,
    ],
  },
})
