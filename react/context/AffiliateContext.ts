import React from 'react'
import type { QueryAffiliateOrdersArgs } from 'vtex.affiliates-commission-service'
import type { ApolloQueryResult } from 'apollo-client'

import type {
  AffiliatesOrdersData,
  Totalizers,
  TotalizersProfile,
  OrdersPagination,
  AffiliatesOrdersQueryReturnType,
  AffiliateOrderQueryReturnType,
} from '../typings/tables'
import type { Affiliate } from '../typings/affiliate'
import { PAGE_SIZE } from '../utils/constants'

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
  refetchOrders: (
    props: QueryAffiliateOrdersArgs
  ) => Promise<ApolloQueryResult<AffiliatesOrdersQueryReturnType>>
  setPagination?: (item: PaginationProps) => void
  pagination: PaginationProps
  setStartDate: (date: Date) => void
  setEndDate: (date: Date) => void
  setStatusFilter: (status: string) => void
  startDate: Date
  endDate: Date
  statusFilter: string
  minInitialDate: Date
  affiliate: Affiliate
  affiliateOrderData?: AffiliateOrderQueryReturnType
  orderId?: string
  setOrderId: (orderId: string) => void
  orderLoading: boolean
  affiliateOrdersLoading: boolean
  orders?: AffiliatesOrdersData[]
  ordersPagination?: OrdersPagination
  totalizer?: Totalizers
  totalizersProfile?: TotalizersProfile
}

const AffiliateContext = React.createContext<AffiliateContextType>({
  isValid: false,
  isLogged: false,
  refetchAffiliate: () => {},
  refetchOrders: () =>
    Promise.resolve({} as ApolloQueryResult<AffiliatesOrdersQueryReturnType>),
  affiliate: {
    isApproved: false,
  },
  pagination: {
    tableSize: PAGE_SIZE,
    currentPage: 1,
    currentItemFrom: 1,
    currentItemTo: PAGE_SIZE,
  },
  setStartDate: () => {},
  setEndDate: () => {},
  setStatusFilter: () => {},
  setOrderId: () => {},
  orderLoading: false,
  affiliateOrdersLoading: false,
  startDate: new Date(),
  endDate: new Date(),
  statusFilter: '',
  minInitialDate: new Date(),
})

export default AffiliateContext
