import { SUCCESS } from '../utils/constants'

export async function updateAffiliate(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: { affiliates },
    state,
    vtex: { logger },
  } = ctx

  if (!state.affiliate) {
    logger.error({
      metric: 'update-affiliate',
      message: 'Affiliate was not on state',
    })
    throw new Error('Error updating the affiliate')
  }

  try {
    const mdDocument = {
      ...state.affiliate,
    }

    await affiliates.update(mdDocument.id, mdDocument)
  } catch (err) {
    logger.error({
      metric: 'update-affiliate',
      message: err.message,
    })
    throw new Error('Error updating the affiliate')
  }

  ctx.status = SUCCESS
  ctx.message = 'Affiliate updated sucessfully'

  await next()
}
