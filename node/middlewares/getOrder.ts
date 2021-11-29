export async function getOrder(
  { body, clients: { oms }, state, vtex: { logger } }: StatusChangeContext,
  next: () => Promise<unknown>
) {
  const { orderId } = body

  try {
    const order = await oms.order(orderId)

    state.order = order
  } catch (err) {
    logger.error({
      metric: 'get-order',
      message: 'Error getting the order',
      orderId,
      error: err.message,
    })
    throw new Error('Error getting the order')
  }

  await next()
}
