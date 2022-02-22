import type { Affiliates, MutationAddAffiliateArgs } from 'vtex.affiliates'

import { isSlugValid } from '../utils/shared'

export const addAffiliate = async (
  _: unknown,
  { newAffiliate }: MutationAddAffiliateArgs,
  { clients: { affiliates } }: Context
) => {
  const { slug, email } = newAffiliate // change

  if (!isSlugValid(slug)) {
    throw new Error('Slug is not valid, must be alphanumeric')
  }

  const affiliateInDbBySlug = await affiliates.search(
    { page: 1, pageSize: 10 },
    ['_all'],
    undefined,
    `slug=${slug}`
  )

  if (affiliateInDbBySlug.length > 0) {
    throw new Error('Affiliate url is already in use')
  }

  const affiliateInDbByEmail = await affiliates.search(
    { page: 1, pageSize: 10 },
    ['_all'],
    undefined,
    `email=${email}`
  )

  if (affiliateInDbByEmail.length > 0) {
    throw new Error('Affiliate already exists (email is already in use)')
  }

  const mdDocument = {
    ...newAffiliate,
  } as Affiliates

  const { DocumentId } = await affiliates.save(mdDocument)

  return affiliates.get(DocumentId, ['_all'])
}
