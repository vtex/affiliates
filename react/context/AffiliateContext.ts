import React from 'react'

import type { AffiliatesOrdersData, Totalizers } from '../typings/tables'

interface AffiliateContextType {
  isValid: boolean
  isLogged: boolean
  refetchAffiliate: () => void
  refetchOrders: () => void
  affiliate: unknown
  orders?: AffiliatesOrdersData[]
  totalizer?: Totalizers
}

const AffiliateContext = React.createContext<AffiliateContextType>({
  isValid: false,
  isLogged: false,
  refetchAffiliate: () => {},
  refetchOrders: () => {},
  affiliate: {},
})

export default AffiliateContext
