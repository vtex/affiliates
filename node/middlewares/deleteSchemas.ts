export async function deleteSchemas(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: { schemas },
    state,
    vtex: { logger },
  } = ctx

  try {
    const schemasToDelete = state?.schemas ?? []

    schemasToDelete.forEach(async (i) => {
      await schemas.deleteSchemas('vtex_affiliates_Affiliates', i)
    })
  } catch (err) {
    logger.error({
      metric: 'delete-affiliate-schema',
      message: err.message,
    })
    throw new Error('Error deleting affiliate schemas')
  }

  ctx.message = `Schema Deleted`
  ctx.body = `Schema Deleted`
  ctx.status = 200

  await next()
}
