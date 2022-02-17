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

  // TODO: Change this logic to search for the slug in the DB
  // Right now it's our ID but it will not be anymore
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
    ...newAffiliate,
  } as Affiliates

  const { DocumentId } = await affiliates.save(mdDocument)

  return affiliates.get(DocumentId, ['_all'])
}
