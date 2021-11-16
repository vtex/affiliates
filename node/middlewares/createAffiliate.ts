import { SUCCESS } from '../utils/constants'

export async function createAffiliate(
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
      metric: 'create-affiliate',
      message: 'Affiliate was not on state',
    })
    throw new Error('Error saving the new affiliate')
  }

  try {
    const mdDocument = {
      id: state.affiliate.slug,
      ...state.affiliate,
    }

    await affiliates.save(mdDocument)
  } catch (err) {
    logger.error({
      metric: 'create-affiliate',
      message: err.message,
    })
    throw new Error('Error saving the new affiliate')
  }

  ctx.status = SUCCESS
  ctx.message = 'Affiliate created sucessfully'

  await next()
}
