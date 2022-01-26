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
