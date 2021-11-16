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

  try {
    const mdDocument = {
      id: state.affiliate.slug,
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
