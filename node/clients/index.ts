import { IOClients } from '@vtex/api'
import { masterDataFor, Checkout, OMS } from '@vtex/clients'
import type { Affiliates } from 'vtex.affiliates'

export class Clients extends IOClients {
  public get affiliates() {
    return this.getOrSet('affiliates', masterDataFor<Affiliates>('affiliates'))
  }

  public get checkout() {
    return this.getOrSet('checkout', Checkout)
  }

  public get oms() {
    return this.getOrSet('oms', OMS)
  }
}
