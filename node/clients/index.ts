import { IOClients } from '@vtex/api'
import { masterDataFor } from '@vtex/clients'

import type { Affiliates, UserAffiliation } from '../typings/affiliates'
import AuthenticationClient from './authenticationClient'
import CheckoutExtended from './checkout'
import IdentityClient from './IdentityClient'
import VtexId from './vtexId'
import { withCustomSchema } from '../utils/withCustomSchema'

export class Clients extends IOClients {
  public get affiliates() {
    return this.getOrSet(
      'affiliates',
      withCustomSchema('1.7.0', masterDataFor<Affiliates>('affiliates'))
    )
  }

  public get userAffiliation() {
    return this.getOrSet(
      'userAffiliation',
      withCustomSchema(
        '1.7.0',
        masterDataFor<UserAffiliation>('userAffiliation')
      )
    )
  }

  public get checkout() {
    return this.getOrSet('checkout', CheckoutExtended)
  }

  public get authentication() {
    return this.getOrSet('authentication', AuthenticationClient)
  }

  public get identity() {
    return this.getOrSet('identity', IdentityClient)
  }

  public get vtexId() {
    return this.getOrSet('vtexId', VtexId)
  }
}
