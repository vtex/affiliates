export async function getClient(
  { clients: { masterdata }, state, vtex: { logger } }: StatusChangeContext,
  next: () => Promise<unknown>
) {
  const {
    order: {
      clientProfileData: { userProfileId },
    },
  } = state

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
