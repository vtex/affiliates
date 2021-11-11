import { json } from 'co-body'

import type { AffiliateInput } from '../typings/affiliates'

export async function validateCreate(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: { affiliates },
    req,
  } = ctx

  const newAffiliate: AffiliateInput = await json(req)

  // First we check if the slug is valid
  const regexExp = /^[A-Za-z0-9-_]+/

  const slugTest = newAffiliate.slug.match(regexExp)

  if (!slugTest || slugTest[0] !== newAffiliate.slug) {
    throw new Error('Slug is not valid, must be alphanumeric')
  }

  // Then we check to see if the slug already exists
  const affiliateInDbById = await affiliates.get(newAffiliate.slug, ['_all'])

  if (affiliateInDbById) {
    throw new Error('Affiliate already exists(slug is already in use)')
  }

  // Lastly we check to see if the email already exists
  const affiliateInDbByEmail = await affiliates.search(
    { page: 1, pageSize: 10 },
    ['_all'],
    undefined,
    `email=${newAffiliate.email}`
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
