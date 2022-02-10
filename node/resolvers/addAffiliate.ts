import type { Affiliates, MutationAddAffiliateArgs } from 'vtex.affiliates'

import { isSlugValid } from '../utils/shared'

export const addAffiliate = async (
  _: unknown,
  { newAffiliate }: MutationAddAffiliateArgs,
  { clients: { affiliates } }: Context
) => {
  const { slug, email } = newAffiliate

  if (!isSlugValid(slug)) {
    throw new Error('Slug is not valid, must be alphanumeric')
  }

  const affiliateInDbById = await affiliates.get(slug, ['_all'])

  if (affiliateInDbById) {
    throw new Error('Affiliate already exists(slug is already in use)')
  }

  const affiliateInDbByEmail = await affiliates.search(
    { page: 1, pageSize: 10 },
    ['_all'],
    undefined,
    `email=${email}`
  )

  if (affiliateInDbByEmail.length > 0) {
    throw new Error('Affiliate already exists(email is already in use)')
  }

  const mdDocument = {
    id: slug,
    ...newAffiliate,
  } as Affiliates

  delete mdDocument.slug
  await affiliates.save(mdDocument)

  return affiliates.get(slug, ['_all'])
}
