export async function validateLead(
  { state: { affiliateLead }, clients: { apps } }: StatusChangeContext,
  next: () => Promise<unknown>
) {
  const affiliateId = affiliateLead?.affiliateId
  const affiliateStartDate = affiliateLead?.affiliateStartDate

  const { leadDurationInDays }: { leadDurationInDays: number } =
    await apps.getAppSettings(process.env.VTEX_APP_ID as string)

  if (affiliateId) {
    const today = new Date()

    const leadEndDate = new Date(affiliateStartDate)

    leadEndDate.setDate(leadEndDate.getDate() + leadDurationInDays)

    if (today <= leadEndDate) {
      return
    }
  }

  await next()
}
