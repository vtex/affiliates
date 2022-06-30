import React from 'react'

import type {
  AffiliatesOrdersData,
  Totalizers,
  TotalizersProfile,
  OrdersPagination,
} from '../typings/tables'
import type { Affiliate } from '../typings/affiliate'

interface PaginationProps {
  tableSize: number
  currentPage: number
  currentItemFrom: number
  currentItemTo: number
}
interface AffiliateContextType {
  isValid: boolean
  isLogged: boolean
  refetchAffiliate: () => void
  refetchOrders: () => void
  setPagination?: (item: PaginationProps) => void
  pagination?: PaginationProps
  affiliate: Affiliate
  orders?: AffiliatesOrdersData[]
  ordersPagination?: OrdersPagination
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
