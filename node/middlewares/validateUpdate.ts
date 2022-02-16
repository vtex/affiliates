import { json } from 'co-body'

import type { AffiliateInput } from '../typings/affiliates'
import { isSlugValid } from '../utils/shared'

export async function validateUpdate(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: { affiliates },
    req,
  } = ctx

  const updateAffiliate: AffiliateInput = await json(req)
  const { id, slug, email } = updateAffiliate // change

  // First we check if the slug is valid
  if (slug && !isSlugValid(slug)) {
    throw new Error('Slug is not valid, must be alphanumeric')
  }

  if (!id) {
    throw new Error('ID is required')
  }

  const affiliateInDbById = await affiliates.get(id, ['_all'])

  if (!affiliateInDbById) {
    throw new Error(
      'Affiliate not found. Do you really want to update an affiliate?'
    )
  }

  // Then we check to see if the slug already exists so that we can update the affiliate
  const affiliateInDbBySlug = await affiliates.search(
    { page: 1, pageSize: 10 },
    ['_all'],
    undefined,
    `slug=${slug}`
  )

  if (affiliateInDbBySlug.length > 0 && affiliateInDbBySlug[0].id !== id) {
    throw new Error('URL slug is already in use by another affiliate')
  }

  // Lastly we check to see if the email field, when sent, is not being used by another affiliate
  if (email) {
    const affiliateInDbByEmail = await affiliates.search(
      { page: 1, pageSize: 10 },
      ['_all'],
      undefined,
      `email=${email}`
    )

    if (affiliateInDbByEmail.length > 0 && affiliateInDbByEmail[0].id !== id) {
      throw new Error('Email is already in use by another affiliate')
    }
  }

  ctx.state = {
    ...ctx.state,
    affiliate: updateAffiliate,
  }

  await next()
}
