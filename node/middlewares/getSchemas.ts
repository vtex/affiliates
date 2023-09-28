export async function getSchemas(ctx: Context, next: () => Promise<unknown>) {
  const {
    clients: { schemas },
    vtex: { logger },
  } = ctx

  try {
    const schemaList = await schemas.getSchemas('vtex_affiliates_Affiliates')

    console.info('testing', schemaList)
  } catch (err) {
    logger.error({
      metric: 'get-affiliate-schema',
      message: err.message,
    })
    throw new Error('Error getting affiliate schemas')
  }

  ctx.message = `Schema list retrieved`
  ctx.body = `Schema list retrieved`
  ctx.status = 200

  await next()
}
