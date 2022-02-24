import { json } from 'co-body'
import type { Affiliates } from 'vtex.affiliates'

import type { AffiliateInput } from '../typings/affiliates'
import { findDocumentsByField, isSlugValid } from '../utils/shared'

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

  const affiliatesInDbBySlug = await findDocumentsByField<Affiliates>(
    affiliates,
    'slug',
    slug
  )

  if (affiliatesInDbBySlug.length > 0) {
    throw new Error('Affiliate already exists (url slug is already in use)')
  }

  // Lastly we check to see if the email already exists
  const affiliatesInDbByEmail = await findDocumentsByField<Affiliates>(
    affiliates,
    'email',
    email
  )

  if (affiliatesInDbByEmail.length > 0) {
    throw new Error('Affiliate already exists(email is already in use)')
  }

  ctx.state = {
    ...ctx.state,
    affiliate: newAffiliate,
  }

  await next()
}
