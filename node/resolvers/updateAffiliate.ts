import type { Affiliates, MutationUpdateAffiliateArgs } from 'vtex.affiliates'

import { isSlugValid } from '../utils/shared'

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

  const affiliateInDbBySlug = await affiliates.search(
    { page: 1, pageSize: 10 },
    ['_all'],
    undefined,
    `slug=${slug}`
  )

  if (
    affiliateInDbBySlug.length > 0 &&
    affiliateInDbBySlug[0].id !== affiliateId
  ) {
    throw new Error('Affiliate url is already in use')
  }

  const affiliateInDbByEmail = await affiliates.search(
    { page: 1, pageSize: 10 },
    ['_all'],
    undefined,
    `email=${email}`
  )

  if (
    affiliateInDbByEmail.length > 0 &&
    affiliateInDbByEmail[0].id !== affiliateId
  ) {
    throw new Error('Email is already in use by another affiliate')
  }

  const mdDocument = {
    ...updateAffiliateData,
  } as Affiliates

  await affiliates.update(affiliateId, mdDocument)

  return affiliates.get(affiliateId, ['_all'])
}
