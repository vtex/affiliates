import { IOClients } from '@vtex/api'
import { masterDataFor, Checkout, OMS } from '@vtex/clients'
import type { Affiliates, ClientAffiliation } from 'vtex.affiliates'

import AuthenticationClient from './authenticationClient'

export class Clients extends IOClients {
  public get affiliates() {
    return this.getOrSet('affiliates', masterDataFor<Affiliates>('affiliates'))
  }

  public get clientAffiliation() {
    return this.getOrSet(
      'clientAffiliation',
      masterDataFor<ClientAffiliation>('clientAffiliation')
    )
  }

  public get checkout() {
    return this.getOrSet('checkout', Checkout)
  }

  public get oms() {
    return this.getOrSet('oms', OMS)
  }

  public get authentication() {
    return this.getOrSet('authentication', AuthenticationClient)
  }
}
