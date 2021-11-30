export async function updateLead(
  { clients: { masterdata }, state, vtex: { logger } }: StatusChangeContext,
  next: () => Promise<unknown>
) {
  const { client, affiliate } = state

  const clientNewLeadInfo = {
    ...client,
    affiliateId: affiliate,
    affiliateStartDate: new Date().toISOString(),
  }

  try {
    await masterdata.updatePartialDocument({
      dataEntity: 'CL',
      id: client.id,
      fields: clientNewLeadInfo,
    })
  } catch (err) {
    logger.error({
      metric: 'update-lead',
      message: 'Error updating the lead',
      info: clientNewLeadInfo,
      error: err.message,
    })
    throw new Error('Error updating the lead')
  }

  await next()
}
