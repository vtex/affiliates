import type { ReactNode } from 'react'

type Pagination = {
  page: number
  pageSize: number
  total: number
}

type OrderItem = {
  skuId: string
  skuName: string
  skuImageUrl: string
  price: number
  quantity: number
  commission: number
}

export type AffiliatesOrdersData = {
  id: string
  orderId: string
  affiliateId: string
  status: string
  userEmail: string
  orderTotal: number
  orderTotalCommission: number
  orderDate: string
  orderItems: [OrderItem]
  lastInteractionIn: string
}

export type AffiliatesOrdersQueryReturnType = {
  affiliateOrders: {
    data: [AffiliatesOrdersData]
    pagination: Pagination
  }
}

export type AffiliateOrderQueryReturnType = {
  affiliateOrder: AffiliatesOrdersData
}

type CommissionBySKU = {
  id: string
  skuId: string
  commission: number
  refId: string
}

export type CommissionsQueryReturnType = {
  commissionsBySKU: {
    data: [CommissionBySKU]
    pagination: Pagination
  }
}

export type Action = {
  label: string
  icon: ReactNode
  handleOnClick: (item: unknown) => void
}
