export async function verifyUserAffiliation(
  { state: { affiliateLead }, clients: { apps } }: UserLoginContext,
  next: () => Promise<unknown>
) {
  const affiliateId = affiliateLead?.affiliateId
  const affiliateStartDate = affiliateLead?.affiliateStartDate

  const { leadDurationInDays }: { leadDurationInDays: number } =
    await apps.getAppSettings(process.env.VTEX_APP_ID as string)

  if (affiliateId) {
    const today = new Date()

    const leadEndDate = new Date(affiliateStartDate as string)

    leadEndDate.setDate(leadEndDate.getDate() + leadDurationInDays)

    if (today > leadEndDate) {
      return
    }
  } else {
    return
  }

  await next()
}
