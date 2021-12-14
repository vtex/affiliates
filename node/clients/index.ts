import { IOClients } from '@vtex/api'
import { masterDataFor, Checkout, OMS } from '@vtex/clients'
import type { Affiliates, UserAffiliation } from 'vtex.affiliates'

import AuthenticationClient from './authenticationClient'

export class Clients extends IOClients {
  public get affiliates() {
    return this.getOrSet('affiliates', masterDataFor<Affiliates>('affiliates'))
  }

  public get userAffiliation() {
    return this.getOrSet(
      'userAffiliation',
      masterDataFor<UserAffiliation>('userAffiliation')
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
