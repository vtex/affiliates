import type { Affiliates, MutationUpdateAffiliateArgs } from 'vtex.affiliates'
import CustomGraphQLError from '@vtex/api/lib/errors/customGraphQLError'

import { findDocumentsByField, isSlugValid } from '../utils/shared'
import type { Error } from './pushErrors'
import { pushErrors } from './pushErrors'

export const updateAffiliate = async (
  _: unknown,
  {
    affiliateId,
    updateAffiliate: updateAffiliateData,
  }: MutationUpdateAffiliateArgs,
  { clients: { affiliates } }: Context
) => {
  const { slug, email } = updateAffiliateData
  const errors: Error[] = []

  if (slug && !isSlugValid(slug)) {
    pushErrors(
      {
        message: 'Slug is not valid, must be alphanumeric',
        code: 'SlugNotAlphanumeric',
      },
      errors
    )
  }

  const affiliateInDbById = await affiliates.get(affiliateId, ['_all'])

  if (!affiliateInDbById) {
    pushErrors(
      {
        message:
          'Affiliate not found, is this the email used by the affiliate you are trying to update?',
        code: 'AffiliateNotFound',
      },
      errors
    )
  }

  const affiliatesInDbBySlug = await findDocumentsByField<Affiliates>(
    affiliates,
    'slug',
    slug ?? ''
  )

  if (
    affiliatesInDbBySlug?.length > 0 &&
    affiliatesInDbBySlug[0]?.id !== affiliateId
  ) {
    pushErrors(
      {
        message: 'Affiliate url is already in use',
        code: 'URLInUse',
      },
      errors
    )
  }

  const affiliatesInDbByEmail = await findDocumentsByField<Affiliates>(
    affiliates,
    'email',
    email ?? ''
  )

  if (
    affiliatesInDbByEmail?.length > 0 &&
    affiliatesInDbByEmail[0]?.id !== affiliateId
  ) {
    pushErrors(
      {
        message: 'Affiliate already exists (email is already in use)',
        code: 'EmailUsedByOtherAffiliate',
      },
      errors
    )
  }

  if (errors.length >= 1) {
    throw new CustomGraphQLError('Update Affiliate validation error', errors)
  }

  const mdDocument = {
    ...updateAffiliateData,
  } as Affiliates

  await affiliates.update(affiliateId, mdDocument)

  return affiliates.get(affiliateId, ['_all'])
}
