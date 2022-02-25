import type { Affiliates, MutationUpdateAffiliateArgs } from 'vtex.affiliates'

import { findDocumentsByField, isSlugValid } from '../utils/shared'

export const updateAffiliate = async (
  _: unknown,
  {
    affiliateId,
    updateAffiliate: updateAffiliateData,
  }: MutationUpdateAffiliateArgs,
  { clients: { affiliates } }: Context
) => {
  const { slug, email } = updateAffiliateData

  if (slug && !isSlugValid(slug)) {
    throw new Error('Slug is not valid, must be alphanumeric')
  }

  const affiliateInDbById = await affiliates.get(affiliateId, ['_all'])

  if (!affiliateInDbById) {
    throw new Error(
      'Affiliate not found. Do you really want to update an affiliate?'
    )
  }

  const affiliatesInDbBySlug = await findDocumentsByField<Affiliates>(
    affiliates,
    'slug',
    slug ?? ''
  )

  if (
    affiliatesInDbBySlug.length > 0 &&
    affiliatesInDbBySlug[0].id !== affiliateId
  ) {
    throw new Error('Affiliate url is already in use')
  }

  const affiliatesInDbByEmail = await findDocumentsByField<Affiliates>(
    affiliates,
    'email',
    email ?? ''
  )

  if (
    affiliatesInDbByEmail.length > 0 &&
    affiliatesInDbByEmail[0].id !== affiliateId
  ) {
    throw new Error('Email is already in use by another affiliate')
  }

  const mdDocument = {
    ...updateAffiliateData,
  } as Affiliates

  await affiliates.update(affiliateId, mdDocument)

  return affiliates.get(affiliateId, ['_all'])
}
