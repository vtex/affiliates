import { json } from 'co-body'

import type { GetOrderFormInput } from '../typings/affiliates'

export async function getOrderForm(
  { req, clients: { checkout }, state, vtex: { logger } }: UserLoginContext,
  next: () => Promise<unknown>
) {
  const reqParams: GetOrderFormInput = await json(req)
  const { orderFormId } = reqParams

  try {
    const orderForm = await checkout.orderForm(orderFormId)

    state.orderForm = orderForm
    state.userProfileId = orderForm.userProfileId
  } catch (err) {
    logger.error({
      metric: 'get-order-form',
      message: 'Error getting the orderForm',
      orderFormId,
      error: err.message,
    })
    throw new Error('Error getting the orderForm')
  }

  await next()
}
