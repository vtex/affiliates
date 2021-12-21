export async function getOrder(
  { body, clients: { checkout }, state, vtex: { logger } }: StatusChangeContext,
  next: () => Promise<unknown>
) {
  const { orderId } = body

  try {
    const order = await checkout.order(orderId)

    state.order = order
    state.userProfileId = order.userProfileId
    state.userEmail = order.clientProfileData.email
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
