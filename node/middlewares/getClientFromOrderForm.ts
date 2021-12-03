export async function getClientFromOrderForm(
  { clients: { masterdata }, state, vtex: { logger } }: UserLoginEventContext,
  next: () => Promise<unknown>
) {
  const {
    orderForm: { userProfileId },
  } = state

  //   TODO change this logic to a service so it can be shared with the getClient middleware

  try {
    const clients = await masterdata.searchDocuments({
      dataEntity: 'CL',
      fields: ['id', 'affiliateId', 'affiliateStartDate'],
      pagination: {
        page: 1,
        pageSize: 1,
      },
      where: `userId = ${userProfileId}`,
    })

    if (clients.length > 0) {
      state.client = clients[0]
    } else {
      return
    }
  } catch (err) {
    logger.error({
      metric: 'get-client',
      message: 'Error getting the client',
      userProfileId,
      error: err.message,
    })
    throw new Error('Error getting the client')
  }

  await next()
}
