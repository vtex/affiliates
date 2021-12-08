export async function authenticateRequest(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const { authentication, licenseManager } = ctx.clients
  const appKey = ctx.headers['x-vtex-api-appkey'] as string
  const appToken = ctx.headers['x-vtex-api-apptoken'] as string

  if (!appKey || !appToken) {
    throw new Error('Missing appKey or appToken')
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
    throw new Error('Unauthorized')
  }

  await next()
}
