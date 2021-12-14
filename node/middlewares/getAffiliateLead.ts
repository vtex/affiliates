export async function getAffiliateLead(
  {
    clients: { userAffiliation },
    state,
    vtex: { logger },
  }: UserLoginEventContext | StatusChangeContext,
  next: () => Promise<unknown>
) {
  const { userProfileId } = state

  try {
    const affiliateLead = await userAffiliation.get(userProfileId, [
      'id',
      'affiliateId',
      'affiliateStartDate',
    ])

    if (affiliateLead) {
      state.affiliateLead = affiliateLead
    } else {
      return
    }
  } catch (err) {
    logger.error({
      metric: 'get-affiliate-lead',
      message: 'Error getting the Affiliate Lead',
      userProfileId,
      error: err.message,
    })
    throw new Error('Error getting the Affiliate Lead')
  }

  await next()
}
