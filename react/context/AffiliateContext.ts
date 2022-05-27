import React from 'react'

import type { AffiliatesOrdersData, Totalizers } from '../typings/tables'
import type { Affiliate } from '../typings/affiliate'

interface AffiliateContextType {
  isValid: boolean
  isLogged: boolean
  refetchAffiliate: () => void
  refetchOrders: () => void
  affiliate?: Affiliate
  orders?: AffiliatesOrdersData[]
  totalizer?: Totalizers
}

const AffiliateContext = React.createContext<AffiliateContextType>({
  isValid: false,
  isLogged: false,
  refetchAffiliate: () => {},
  refetchOrders: () => {},
})

export default AffiliateContext
