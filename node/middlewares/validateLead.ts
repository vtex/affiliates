export async function validateLead(
  { state, clients: { apps } }: StatusChangeContext,
  next: () => Promise<unknown>
) {
  const {
    client: { affiliateId, affiliateStartDate },
  } = state

  const { leadDuration }: { leadDuration: number } = await apps.getAppSettings(
    process.env.VTEX_APP_ID as string
  )

  if (affiliateId) {
    const today = new Date()

    const leadEndDate = new Date(affiliateStartDate)

    leadEndDate.setDate(leadEndDate.getDate() + leadDuration)

    if (today <= leadEndDate) {
      return
    }
  }

  await next()
}
