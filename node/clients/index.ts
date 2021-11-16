import { IOClients } from '@vtex/api'
import { masterDataFor } from '@vtex/clients'
import type { Affiliates } from 'vtex.affiliates'

export class Clients extends IOClients {
  public get affiliates() {
    return this.getOrSet('affiliates', masterDataFor<Affiliates>('affiliates'))
  }
}
