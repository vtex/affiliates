import type { InstanceOptions, IOContext, RequestConfig } from '@vtex/api'
import type { OrderDetailResponse } from '@vtex/clients'
import { Checkout } from '@vtex/clients'

interface OrderDetailResponseExtended extends OrderDetailResponse {
  userProfileId: string
}

const routes = {
  order: (orderId: string) => `/api/checkout/pvt/orders/${orderId}`,
}

export default class CheckoutExtended extends Checkout {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdclientAutCookie: context.authToken,
        'Content-Type': 'application/json',
      },
    })
  }

  public order(
    orderId: string,
    config?: RequestConfig
  ): Promise<OrderDetailResponseExtended> {
    return this.http.get(routes.order(orderId), config)
  }
}
