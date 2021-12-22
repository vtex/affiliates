import { SUCCESS } from '../utils/constants'

export async function verifyUserAffiliation(
  ctx: UserLoginContext,
  next: () => Promise<unknown>
) {
  const {
    state: { affiliateLead },
    clients: { apps },
  } = ctx

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
    ctx.status = SUCCESS

    return
  }

  await next()
}
