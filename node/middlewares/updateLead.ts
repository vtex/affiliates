export async function updateLead(
  {
    clients: { userAffiliation },
    state,
    vtex: { logger },
  }: StatusChangeContext,
  next: () => Promise<unknown>
) {
  const { userEmail: email, userProfileId: leadDocumentId, affiliate } = state

  const userNewLeadInfo = {
    id: leadDocumentId,
    email,
    affiliateId: affiliate,
    affiliateStartDate: new Date().toISOString(),
  }

  try {
    await userAffiliation.saveOrUpdate(userNewLeadInfo)
  } catch (err) {
    logger.error({
      metric: 'update-lead',
      message: 'Error updating the lead',
      info: userNewLeadInfo,
      error: err.message,
    })
    throw new Error('Error updating the lead')
  }

  await next()
}
