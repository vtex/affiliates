import { json } from 'co-body'

import type { AffiliateInput } from '../typings/affiliates'
import { isSlugValid } from '../utils/shared'

export async function validateCreate(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: { affiliates },
    req,
  } = ctx

  const newAffiliate: AffiliateInput = await json(req)
  const { slug, email } = newAffiliate

  // First we check if the slug is valid
  if (!isSlugValid(slug)) {
    throw new Error('Slug is not valid, must be alphanumeric')
  }

  // Then we check to see if the slug already exists

  const affiliateInDbBySlug = await affiliates.search(
    { page: 1, pageSize: 10 },
    ['_all'],
    undefined,
    `slug=${slug}`
  )

  if (affiliateInDbBySlug.length > 0) {
    throw new Error('Affiliate already exists (url slug is already in use)')
  }

  // Lastly we check to see if the email already exists
  const affiliateInDbByEmail = await affiliates.search(
    { page: 1, pageSize: 10 },
    ['_all'],
    undefined,
    `email=${email}`
  )

  if (affiliateInDbByEmail.length > 0) {
    throw new Error('Affiliate already exists(email is already in use)')
  }

  ctx.state = {
    ...ctx.state,
    affiliate: newAffiliate,
  }

  await next()
}
