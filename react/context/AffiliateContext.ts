import React from 'react'

import type {
  AffiliatesOrdersData,
  Totalizers,
  TotalizersProfile,
} from '../typings/tables'
import type { Affiliate } from '../typings/affiliate'

interface AffiliateContextType {
  isValid: boolean
  isLogged: boolean
  refetchAffiliate: () => void
  refetchOrders: () => void
  affiliate: Affiliate
  orders?: AffiliatesOrdersData[]
  totalizer?: Totalizers
  totalizersProfile?: TotalizersProfile
}

const AffiliateContext = React.createContext<AffiliateContextType>({
  isValid: false,
  isLogged: false,
  refetchAffiliate: () => {},
  refetchOrders: () => {},
  affiliate: {
    isApproved: false,
  },
})

export default AffiliateContext
