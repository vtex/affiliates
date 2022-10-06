import type { Affiliates, MutationAddAffiliateArgs } from 'vtex.affiliates'
import CustomGraphQLError from '@vtex/api/lib/errors/customGraphQLError'

import { findDocumentsByField, isSlugValid } from '../utils/shared'
import type { Error } from './pushErrors'
import { pushErrors } from './pushErrors'

export const addAffiliate = async (
  _: unknown,
  { newAffiliate }: MutationAddAffiliateArgs,
  { clients: { affiliates } }: Context
) => {
  const { slug, email } = newAffiliate
  const errors: Error[] = []

  if (!isSlugValid(slug)) {
    pushErrors(
      {
        message: 'Slug is not valid, must be alphanumeric',
        code: 'SlugNotAlphanumeric',
      },
      errors
    )
  }

  const affiliatesInDbBySlug = await findDocumentsByField<Affiliates>(
    affiliates,
    'slug',
    slug
  )

  if (affiliatesInDbBySlug?.length > 0) {
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
    email
  )

  if (affiliatesInDbByEmail?.length > 0) {
    pushErrors(
      {
        message: 'Affiliate already exists (email is already in use)',
        code: 'AffiliateAlreadyExists',
      },
      errors
    )
  }

  if (errors.length >= 1) {
    throw new CustomGraphQLError('Add Affiliate validation error', errors)
  }

  const mdDocument = {
    ...newAffiliate,
  } as Affiliates

  const { DocumentId } = await affiliates.save(mdDocument)

  return affiliates.get(DocumentId, ['_all'])
}
