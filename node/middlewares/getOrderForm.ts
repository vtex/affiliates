export async function getOrderForm(
  {
    body,
    clients: { checkout },
    state,
    vtex: { logger },
  }: UserLoginEventContext,
  next: () => Promise<unknown>
) {
  const { orderFormId } = body

  try {
    const orderForm = await checkout.orderForm(orderFormId)

    state.orderForm = orderForm
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
