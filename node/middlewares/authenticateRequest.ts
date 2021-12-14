import { ERRORS } from '../utils/constants'

export async function authenticateRequest(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const { authentication, licenseManager } = ctx.clients
  const appKey = ctx.headers['x-vtex-api-appkey'] as string
  const appToken = ctx.headers['x-vtex-api-apptoken'] as string

  if (!appKey || !appToken) {
    ctx.status = ERRORS.missingAuthentication.status
    ctx.message = ERRORS.missingAuthentication.message

    return
  }

  const { token } = await authentication.getAuthToken({
    appKey,
    appToken,
  })

  const canAccessMasterdata = await licenseManager.canAccessResource(
    token,
    'ADMIN_DS'
  )

  if (!canAccessMasterdata) {
    ctx.status = ERRORS.forbidden.status
    ctx.message = ERRORS.forbidden.message

    return
  }

  await next()
}
