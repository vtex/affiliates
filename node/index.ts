import type {
  ClientsConfig,
  ServiceContext,
  RecorderState,
  EventContext,
} from '@vtex/api'
import { method, Service } from '@vtex/api'
import type { OrderForm } from '@vtex/clients'

import { Clients } from './clients'
import { createAffiliate } from './middlewares/createAffiliate'
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
import type { AffiliateInput, AffiliateLead } from './typings/affiliates'
import { setAffiliateLeadOnCustomData } from './middlewares/setAffiliateLeadOnCustomData'
import { verifyOrderFormAffiliation } from './middlewares/verifyOrderFormAffiliation'
import { getOrderForm } from './middlewares/getOrderForm'
import { getAffiliateStoreName } from './resolvers/getAffiliateStoreName'
import { getAffiliateLead } from './middlewares/getAffiliateLead'
import { verifyUserAffiliation } from './middlewares/verifyUserAffiliation'
import { authenticateRequest } from './middlewares/authenticateRequest'
import { getAffiliates } from './resolvers/getAffiliates'
import { getAffiliatesScroll } from './resolvers/getAffiliatesScroll'
import { addAffiliate } from './resolvers/addAffiliate'
import { updateAffiliate as updateAffiliateResolver } from './resolvers/updateAffiliate'
import { getAffiliate } from './resolvers/getAffiliate'
import { fieldResolvers } from './resolvers/fieldResolvers'
import { getAffiliateByEmail } from './resolvers/getAffiliateByEmail'

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
  type UserLoginContext = ServiceContext<Clients, UserLoginState>

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

  interface UserLoginState extends RecorderState {
    affiliate?: AffiliateInput
    orderForm: OrderForm
    userProfileId?: string | null
    affiliateLead: AffiliateLead
  }
}

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  routes: {
    affiliate: method({
      POST: [authenticateRequest, validateCreate, createAffiliate],
      PATCH: [authenticateRequest, validateUpdate, updateAffiliate],
    }),
    verifyUserAffiliateLead: method({
      POST: [
        getOrderForm,
        verifyOrderFormAffiliation,
        getAffiliateLead,
        verifyUserAffiliation,
        setAffiliateLeadOnCustomData,
      ],
    }),
  },
  graphql: {
    resolvers: {
      Query: {
        isAffiliateValid,
        getAffiliateStoreName,
        getAffiliates,
        getAffiliate,
        getAffiliateByEmail,
        getAffiliatesScroll,
      },
      Mutation: {
        addAffiliate,
        updateAffiliate: updateAffiliateResolver,
        setAffiliateOnOrderForm,
      },
      ...fieldResolvers,
    },
  },
  events: {
    onAppInstalled: setupAppConfiguration,
    setAffiliateLead: [
      getOrder,
      validateCustomData,
      getAffiliateLead,
      validateLead,
      updateLead,
    ],
  },
})
