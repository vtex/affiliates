import type { Affiliates, MutationAddAffiliateArgs } from 'vtex.affiliates'

import { findDocumentsByField, isSlugValid } from '../utils/shared'

export const addAffiliate = async (
  _: unknown,
  { newAffiliate }: MutationAddAffiliateArgs,
  { clients: { affiliates } }: Context
) => {
  const { slug, email } = newAffiliate

  if (!isSlugValid(slug)) {
    throw new Error('Slug is not valid, must be alphanumeric')
  }

  const affiliatesInDbBySlug = await findDocumentsByField<Affiliates>(
    affiliates,
    'slug',
    slug
  )

  if (affiliatesInDbBySlug.length > 0) {
    throw new Error('Affiliate url is already in use')
  }

  const affiliatesInDbByEmail = await findDocumentsByField<Affiliates>(
    affiliates,
    'email',
    email
  )

  if (affiliatesInDbByEmail.length > 0) {
    throw new Error('Affiliate already exists (email is already in use)')
  }

  const mdDocument = {
    ...newAffiliate,
  } as Affiliates

  const { DocumentId } = await affiliates.save(mdDocument)

  return affiliates.get(DocumentId, ['_all'])
}
